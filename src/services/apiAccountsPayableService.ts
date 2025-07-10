import type { AccountsPayablePreviewDTO } from "../types/accountsPayableDTO";
import { type UploadResponse, type ApiResponse } from "../types/apiResponse";
import { connection } from "./connection";

export const accountsPayableServicePreview = async (files: File[]) => {
  console.log("Files to upload:", files);
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
    console.log("data: ", data.data);
    return data.data;
  } catch (error) {
    console.error("Erro no preview de notas:", error);
    throw error;
  }
};

export const accountsPayableService = async (files: File[]) => {
  console.log("Files to upload:", files);
  const form = new FormData();

  files.forEach((file) => {
    form.append("files", file);
  });

  try {
    const { data } = await connection.post<UploadResponse>(
      "/contasPagar",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("data: ", data.data);
    return data.data;
  } catch (error) {
    console.error("Erro no Upload de notas:", error);
    throw error;
  }
};
