export interface IHttpResponse<T> {
  message: string;
  data: T;
}
export interface IHttpError<E> {
  response: {
    status: number;
    data: {
      message: string;
      error: E;
    };
  };
}
