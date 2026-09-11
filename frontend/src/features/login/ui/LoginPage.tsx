import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { useI18nStore, type I18nState } from "@/i18n/useI18nStore";
import { useForm } from "react-hook-form";
import LanguageSwitcher from "@/components/common/Language-switcher";
import { useNavigate } from "react-router-dom";
import LoginService, { type LoginResult } from "../services/login.service";
import type { ApiResponse } from "@/shared/services/http";
import { useAuthStore } from "@/shared/state/authStore";
import { useState } from "react";
import { Message } from "@/components/common/Message";
import { useMessageStore } from "@/shared/state/messageStore";
// import { useEffect } from "react";

type LoginForm = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const navigate = useNavigate();
    const message = useI18nStore((state: I18nState) => state.message);
    const m = message.login || {};
    console.log("LoginPage load");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const handlerSubmit = async (data: LoginForm) => {
        console.log("提交的数据：", data);
        const resp: ApiResponse<LoginResult> = await LoginService.doLogin(data);
        if (!resp.success) {
            useMessageStore.getState().showMessage({
                type: "info",
                title: "错误",
                message: resp.errors,
            });
            return;
        }

        useAuthStore.getState().login({
            userId: resp.data?.userId || '',
            name: resp.data?.name || '',
        });

        localStorage.setItem("token", data.username);
        navigate("/top")


    }

    localStorage.getItem("token") == null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-4 relative">

            {/* 右上角语言选择器（不显眼） */}
            <div className="absolute top-4 right-4 text-sm text-gray-600">
                <LanguageSwitcher></LanguageSwitcher>
            </div>

            {/* 登录卡片 */}
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-white/40 rounded-2xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                        登录
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        请输入您的账户信息
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(handlerSubmit)}>

                        {/* 用户名 */}
                        <div className="space-y-2">
                            <Label className="text-gray-700">{m['userName']}</Label>
                            <Input {...register("username", { required: "用户名必填" })}
                                placeholder="yourname"
                                className="h-11 rounded-xl border-gray-300 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                            />
                            {errors.username && (
                                <p style={{ color: "red" }}>{errors.username.message}</p>
                            )}
                        </div>

                        {/* 密码 */}
                        <div className="space-y-2">
                            <Label className="text-gray-700">{m["password"]}</Label>
                            <Input {...register("password", { required: "密码必填" })}
                                type="password"
                                className="h-11 rounded-xl border-gray-300 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
                            />
                            {errors.password && (
                                <p style={{ color: "red" }}>{errors.password.message}</p>
                            )}
                        </div>

                        {/* 登录按钮 */}
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-medium shadow-lg hover:shadow-xl"
                        >
                            登录
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
