export interface OutputData {
  type: 'image' | 'html' | 'log' | 'error' | null;
  data: string | null;
  logs: string;
}

// FIX: Add the missing 'Idea' type to resolve import errors.
export interface Idea {
  title: string;
  description: string;
  code: string;
}
