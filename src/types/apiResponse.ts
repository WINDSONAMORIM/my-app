export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ApiResponseArray {
  statusCode: number;
  success: boolean;
  message: string;
  data: string;
}

export type UploadResponse = ApiResponse<ApiResponseArray[]>; 
// export interface UploadResponse <T>{
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: T[];
// }


export interface ExpectedErrorResponse {
  isError: true;
  data: {
    statusCode: number;
    message: string;
    name: string;
    isExpected: boolean;
  };
}