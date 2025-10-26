const matplotlibExample = `
# Data for plotting
labels = ['A', 'B', 'C', 'D']
values = [10, 20, 15, 5]

# Create a figure and an axes
fig, ax = plt.subplots(figsize=(6, 4))
ax.bar(labels, values)

# Set labels and title for clarity
ax.set_ylabel('Values')
ax.set_title('Sample Bar Chart')

# The figure object is the last expression, so it will be displayed.
fig`;

const pandasExample = `
# Create a sample DataFrame
data = {
    'Product': ['Apples', 'Oranges', 'Bananas', 'Grapes'],
    'Category': ['Fruit', 'Fruit', 'Fruit', 'Fruit'],
    'Price': [1.20, 0.99, 0.50, 2.50],
    'Quantity': [30, 45, 60, 25]
}

df = pd.DataFrame(data)

# The DataFrame is the last expression, so it will be displayed.
df`;

const seabornExample = `
# Create a random dataset for the heatmap
np.random.seed(0)
data = np.random.rand(8, 12)
fig, ax = plt.subplots(figsize=(10, 6))

# Create a heatmap using seaborn
sns.heatmap(data, ax=ax, cmap='viridis', annot=True, fmt=".1f")

ax.set_title('Seaborn Heatmap Example')
ax.set_xlabel('X-axis')
ax.set_ylabel('Y-axis')

# The figure object is returned for display
fig
`;

const sklearnExample = `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

# Generate synthetic data
X, y = make_classification(n_samples=1000, n_features=10,
                           n_informative=5, n_redundant=0,
                           random_state=42)

# Split data and train a classifier
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
predictions = clf.predict(X_test)

# Plot confusion matrix
cm = confusion_matrix(y_test, predictions, labels=clf.classes_)
fig, ax = plt.subplots(figsize=(6, 6))
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=clf.classes_)
disp.plot(ax=ax, cmap=plt.cm.Blues)
ax.set_title("Scikit-learn Confusion Matrix")

# The figure is displayed
fig
`;

const networkxExample = `
# Create a well-known social network graph
G = nx.karate_club_graph()

fig, ax = plt.subplots(figsize=(8, 8))

# Draw the graph using matplotlib
nx.draw(G, with_labels=True, node_color='skyblue', ax=ax,
        node_size=500, edge_color='gray', font_size=10)

ax.set_title("NetworkX Karate Club Graph")

# The figure is displayed
fig
`;

export type ExampleType = 'matplotlib' | 'pandas' | 'seaborn' | 'sklearn' | 'networkx';

export const getExampleCode = (type: ExampleType): string => {
  switch (type) {
    case 'matplotlib':
      return matplotlibExample.trim();
    case 'pandas':
      return pandasExample.trim();
    case 'seaborn':
      return seabornExample.trim();
    case 'sklearn':
      return sklearnExample.trim();
    case 'networkx':
      return networkxExample.trim();
    default:
      return '';
  }
};