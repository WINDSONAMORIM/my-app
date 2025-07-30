import type { AccountsPayablePreviewDTO } from "../types/accountsPayableDTO";
import { 
  // type UploadResponse, 
  type ApiResponse } from "../types/apiResponse";
import { connection } from "./connection";

export const accountsPayableServicePreview = async (files: File[]):Promise<ApiResponse<AccountsPayablePreviewDTO>[]> => {
  const form = new FormData();
  console.log("Click Upload: ", files);

  files.forEach((file) => {
    form.append("files", file);
  });

  try {
    const { data } = await connection.post<{
      success: boolean;
      message: string;
      data: ApiResponse<AccountsPayablePreviewDTO>[];
    }>("/contasPagarPreview", form, {
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


export const accountsPayableService = async() =>{
  try {
    console.log("accountsPayableService");
    const { data } = await connection.post("/contasPagar",null)
    console.log("Data from accounts payable service:", data.data);
      return data;
  } catch (error) {
    console.error("Erro ao acessar contas a pagar:", error);
    throw error; 
  }
}
// export const accountsPayableService = async (
//   files: File[]
// ): Promise<UploadResponse> => {
//   const form = new FormData();

//   files.forEach((file) => {
//     form.append("files", file);
//   });
//   console.log("Click Enviar Files to be sent: ", files);

//   try {
//     const { data } = await connection.post<
//       UploadResponse | (ApiResponse<null> & { isError: true })
//     >("/contasPagar", form, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("Api service data: ",data )

//     if ("isError" in data && data.isError) {
//       console.log('IsError')
//       console.log("IsError data.data", data.statusCode);  
//       return {
//         statusCode: data.statusCode,
//         success: false,
//         message: data.message,
//         data: [],
//       };
//     }

//     console.log('Fora do IsError data.data',data.data)
//     return {
//       statusCode: data.statusCode,
//       success: true,
//       message: data.message,
//       data: data.data ?? [],
//     };
//   } catch (error) {
//     console.error("Error não esperado", error);
//     throw error;
//   }
// };
