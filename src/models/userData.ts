export type userData = User[];

export interface User {
  id: number;
  user1: string;
  password: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  task1: string;
  dateTask: string;
  idUser: number;
}
