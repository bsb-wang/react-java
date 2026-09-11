import type { LoginRequest } from "@/features/login/services/login.service";
import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/login", async ({ request }) => {

        const body = (await request.json()) as LoginRequest;
        const { username, password } = body;

        if (username !== "111") {
            return HttpResponse.json(
                { error: "USERNAME_ERROR", message: "用户名不存在" },
                { status: 400 }
            );
        }

        if (password !== "222") {
            return HttpResponse.json(
                { error: "PASSWORD_ERROR", message: "密码错误" },
                { status: 400 }
            );
        }

        return HttpResponse.json({
            user: { id: 1, name: "youmin" },
        });
    }),
];
