export interface ErrorHandledResponse {
  isError: true;
  data: {
    statusCode: number;
    message: string;
    name: string;
    isExpected: boolean;
  };
  status: number;
}
