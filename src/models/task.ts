export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
}

export interface TaskData {
  name: string;
  description: string;
  dueDate: Date;
}
