interface ResponsePayload<T> {
    data: T;
    message: string;
    token?: string;
  }
  
  export function createResponse<T>(data: T, message: string, token?: string): ResponsePayload<T> {
    return {
      data: data,
      message: message,
      token: token
    };
  }
  