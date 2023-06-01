import { Task, User } from '../models/userData';
import { fetchApi } from './fetchApi';
import { ApiResponse } from './response';

export interface IApiRepository {
  validateLogin: (arg0: {
    data: {
      user: string;
      password: string;
    };
  }) => User;
  getTasks: (arg0: { idUser: number }) => Task[];
  createTask: (arg0: {
    data: {
      task: string;
      idUser: number;
    };
  }) => Task;
  updateTask: (arg0: {
    id: number;
    data: {
      task: string;
      idUser: number;
    };
  }) => Task;
  deleteTask: (arg0: { id: number }) => void;
}

export type ParsedApiRepository = {
  [K in keyof IApiRepository]: IApiRepository[K] extends (
    arg0: infer P
  ) => infer R
    ? (arg0: P) => Promise<ApiResponse<R>>
    : never;
};

export const ApiRepository: ParsedApiRepository = {
  validateLogin: async ({ data }) => {
    return fetchApi('base', 'users/login', {
      method: 'POST',
      body: data
    });
  },

  getTasks: async ({ idUser }) => {
    return fetchApi('base', `tasks/user/${idUser}`, {
      method: 'GET',
      query: {
        buscar: '',
        orden: 'id',
        tipo_orden: 'ASC'
      }
    });
  },

  createTask: async ({ data }) => {
    return fetchApi('base', 'tasks', {
      method: 'POST',
      body: data
    });
  },

  updateTask: async ({ id, data }) => {
    return fetchApi('base', `tasks/${id}`, {
      method: 'PUT',
      body: data
    });
  },

  deleteTask: async ({ id }) => {
    return fetchApi('base', `tasks/${id}`, {
      method: 'DELETE'
    });
  }
} as const;
