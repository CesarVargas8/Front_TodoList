export interface ErrorResponse {
  error: true;
  mensaje: string;
}

export interface SuccessResponse<T> {
  error: false;
  data: T;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
