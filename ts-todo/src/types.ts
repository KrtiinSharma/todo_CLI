export type TodoStatus = "open" | "done";

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}
