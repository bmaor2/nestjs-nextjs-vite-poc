export interface Todo {
  id: string;
  name: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string | Date;
  completed: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface TodoFormData {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
}

export interface TodoUpdateData extends Partial<TodoFormData> {
  completed?: boolean;
}

// API response type where dates are strings
export interface TodoApiResponse {
  id: string;
  name: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
