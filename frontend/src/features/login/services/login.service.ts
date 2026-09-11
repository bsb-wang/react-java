import { http, type ApiResponse } from "@/shared/services/http";

export type LoginResult = {
    userId: string;
    name: string;
};

export type LoginRequest = {
    username: string,
    password: string
}

const LoginService = {

    doLogin: async (data: LoginRequest): Promise<ApiResponse<LoginResult>> => {
        return await http<LoginResult>("/api/login", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
}

export default LoginService;

