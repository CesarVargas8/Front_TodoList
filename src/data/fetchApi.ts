import axios from 'axios';

import { URL_BASE } from '../utils/constants/env';
import { ApiResponse } from './response';

type ApiServices = 'base';

interface FetchApiOptions {
  headers?: Record<string, string>;
  body?: unknown;
  method?: ApiMethod;
  query?: Record<string, string>;
}

interface AxiosResponse<T> {
  error: boolean;
  mensaje: string | null;
  datos: T | null;
}

const getBaseUrl = (service: ApiServices) => {
  switch (service) {
    case 'base':
      return URL_BASE;
  }
};

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetchApi = async <T>(
  service: ApiServices,
  endpoint: string,
  options?: FetchApiOptions
): Promise<ApiResponse<T>> => {
  const query = options?.query
    ? Object.entries(options.query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';
  const url = `${getBaseUrl(service)}/${endpoint}${query ? `?${query}` : ''}`;

  try {
    const response = await axios<AxiosResponse<T>>(url, {
      method: options?.method ?? 'GET',
      headers: options?.headers,
      data: options?.body
    });
    if (response.data.error) {
      return {
        error: true,
        mensaje: response.data.mensaje ?? 'Error desconocido'
      };
    }

    const data = response.data.datos;
    if (!data) {
      return {
        error: true,
        mensaje: 'Error desconocido'
      };
    }

    return {
      error: false,
      data
    };
  } catch (error) {
    console.error(error);
    if (error instanceof axios.AxiosError) {
      if (error.status === 401) {
        return {
          error: true,
          mensaje: 'No autorizado'
        };
      }
      if (error.status === 500) {
        return {
          error: true,
          mensaje: 'Error interno'
        };
      }
    }

    return {
      error: true,
      mensaje: 'Error desconocido'
    };
  }
};
