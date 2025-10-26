
export const PYTHON_RUNNER_SCRIPT = `
import sys
import io
import base64
import json
import traceback
import ast

# Import visualization and data science libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import seaborn as sns
import networkx as nx
import sklearn
import scipy
import statsmodels

# --- Font and Emoji Setup ---
# Attempt to load Noto Color Emoji font to support emojis in plots.
# The font file is expected to be pre-loaded into the virtual filesystem.
try:
    font_path = '/NotoColorEmoji.ttf'
    fm.fontManager.addfont(font_path)
    # Set rcParams to use the emoji font and a standard fallback.
    # This tells matplotlib to look for characters in 'Noto Color Emoji' first.
    plt.rcParams['font.family'] = ['Noto Color Emoji', 'sans-serif']
except Exception as e:
    # Font setup might fail if the file wasn't loaded correctly.
    # Print a warning to stderr so it can be seen in logs, but don't crash.
    print(f"Emoji font setup warning: {e}", file=sys.stderr)
# --- End of Font Setup ---


# Attempt to set a more robust mathtext parser to avoid issues with LaTeX rendering.
# This might not be available in all matplotlib versions, so we wrap it in a try-except block.
try:
    plt.rcParams['mathtext.parser'] = 'backend'
except KeyError:
    pass # This version of matplotlib doesn't support the 'backend' parser, so we'll use the default.

# This dictionary will hold the globals/locals for the user's code,
# pre-populating it with common libraries for convenience.
execution_scope = {
    "np": np,
    "pd": pd,
    "plt": plt,
    "sns": sns,
    "nx": nx,
    "sklearn": sklearn,
    "scipy": scipy,
    "statsmodels": statsmodels,
}

# Capture print and error statements
stdout_capture = io.StringIO()
sys.stdout = stdout_capture
stderr_capture = io.StringIO()
sys.stderr = stderr_capture

result_json = {"type": None, "data": None, "logs": ""}

try:
    # Safely parse the user's code
    code_block = ast.parse(user_code)
    
    output = None
    # Check if the last part of the code is an expression
    if code_block.body and isinstance(code_block.body[-1], ast.Expr):
        # If so, execute the main body...
        main_body = ast.Module(body=code_block.body[:-1], type_ignores=[])
        exec(compile(main_body, '<string>', mode='exec'), execution_scope)
        # ...and evaluate the final expression to get the result
        last_expr = ast.Expression(body=code_block.body[-1].value)
        output = eval(compile(last_expr, '<string>', mode='eval'), execution_scope)
    else:
        # Otherwise, just execute the whole script
        exec(user_code, execution_scope)

    # --- Type-specific output processing ---
    
    # 1. Process the object returned by the last expression
    if output is not None:
        if isinstance(output, pd.DataFrame):
            result_json["type"] = 'html'
            result_json["data"] = output.to_html(classes='dataframe', border=0)
        
        elif 'matplotlib.figure.Figure' in str(type(output)) or 'matplotlib.axes' in str(type(output).__module__):
            fig = output if 'matplotlib.figure.Figure' in str(type(output)) else output.get_figure()
            if fig and fig.get_axes():
                buf = io.BytesIO()
                fig.savefig(buf, format='png', bbox_inches='tight')
                buf.seek(0)
                result_json["type"] = 'image'
                result_json["data"] = base64.b64encode(buf.read()).decode('utf-8')
                plt.close(fig)
            
    # 2. If no object was returned, check if a matplotlib plot was created implicitly (e.g., by calling plt.plot())
    if result_json["type"] is None and plt.get_fignums():
        fig = plt.gcf()
        if fig and fig.get_axes():
            buf = io.BytesIO()
            fig.savefig(buf, format='png', bbox_inches='tight')
            buf.seek(0)
            result_json["type"] = 'image'
            result_json["data"] = base64.b64encode(buf.read()).decode('utf-8')
            plt.close(fig)

    # 3. If still no visual output, check for any printed text to show as logs
    captured_logs = stdout_capture.getvalue() + stderr_capture.getvalue()
    if result_json["type"] is None and captured_logs:
        result_json["type"] = 'log'
        result_json["data"] = captured_logs

except Exception:
    # On error, format the traceback
    result_json["type"] = 'error'
    result_json["data"] = traceback.format_exc()

finally:
    # Always capture any logs, even if there was other output
    result_json["logs"] = stdout_capture.getvalue() + stderr_capture.getvalue()
    # Restore stdout and stderr
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
    # Ensure all plots are closed to prevent memory leaks
    plt.close('all')

# Return the final result as a JSON string
json.dumps(result_json)
`;