import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiResponse } from "../types/apiResponse";

export const connection = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

connection.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

connection.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorData = data as { message: string; name: string };

      const customError: ApiResponse<null> & { isError: true } = {
        statusCode: status,
        success: false,
        message: errorData.message || "Erro desconhecido",
        data: null,
        isError: true,
      };

      return Promise.resolve({ data: customError });
    }
    return Promise.reject(error);
  }
);

export const ping = async () => {
  try {
    const response = await connection.get("/");
    return response.data;
  } catch (error) {
    console.error("Error pinging the server:", error);
    throw error;
  }
};
