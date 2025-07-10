export interface ApiResponse<T> {
  sucess: boolean;
  message: string;
  data: T;
}

export interface ApiResponseArray {
  statusCode: number;
  sucess: boolean;
  message: string;
  data: string;
}

export type UploadResponse = ApiResponse<ApiResponseArray[]>; 