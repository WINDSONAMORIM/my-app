import { connection } from "./connection"

export const login = async (username: string, password: string) => {
    try {
        const response = await connection.post("/login", {
            username,
            password,
        });
        sessionStorage.setItem("Token", response.data.token);
        connection.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        return response.data;        
    } catch (error) {
        console.error("Login failed:", error);
        throw error;        
    }
    
}