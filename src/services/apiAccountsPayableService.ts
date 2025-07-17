// import axios from "axios";
import type { AccountsPayablePreviewDTO } from "../types/accountsPayableDTO";
import { type UploadResponse, type ApiResponse } from "../types/apiResponse";

import { connection } from "./connection";

export const accountsPayableServicePreview = async (files: File[]) => {
  const form = new FormData();

  files.forEach((file) => {
    form.append("files", file);
  });

  try {
    const { data } = await connection.post<
      ApiResponse<AccountsPayablePreviewDTO[]>
    >("/contasPagarPreview", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  } catch (error) {
    console.error("Erro no preview de notas:", error);
    throw error;
  }
};

export const accountsPayableService = async (
  files: File[]
): Promise<UploadResponse> => {
  const form = new FormData();

  files.forEach((file) => {
    form.append("files", file);
  });

  try {
    const { data } = await connection.post<
      UploadResponse | (ApiResponse<null> & { isError: true })
    >("/contasPagar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if ("isError" in data && data.isError) {
      console.log('IsError')
      console.log("IsError data.data", data.statusCode);  
      return {
        statusCode: data.statusCode,
        success: false,
        message: data.message,
        data: [],
      };
    }

    console.log('Fora do IsError data.data',data.data)
    return {
      statusCode: data.statusCode,
      success: true,
      message: data.message,
      data: data.data ?? [],
    };
  } catch (error) {
    console.error("Error não esperado", error);
    throw error;
  }
};
