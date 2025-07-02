import type { AccountsPayableDTO } from "../types/accountsPayableDTO";
import { connection } from "./connection"

interface ApiResponse<T> {
    sucess: boolean;
    message: string;
    data: T
}

export const accountsPayable = async (files: File[]) => {
    console.log("Files to upload:", files);
    const form = new FormData();
    
    files.forEach((file) => {
        form.append("files", file);
    });

    try {
        const { data } = await connection.post<ApiResponse<AccountsPayableDTO[]>>("/contasPagar", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data.data;        
    } catch (error) {
        console.error("Login failed:", error);
        throw error;        
    }    
}