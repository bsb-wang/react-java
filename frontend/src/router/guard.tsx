// src/router/guard.tsx
import Error401 from "@/components/common/Error401";
import type { JSX } from "react/jsx-runtime";

// 模拟登录状态，你可以改成从 store / cookie / localStorage 读取
function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}

export default function RouteGuard({ children }: { children: JSX.Element }) {
    // 如果未登录 → 显示 401 页面
    if (!isLoggedIn()) {
        return <Error401 />;
    }

    // 已登录 → 正常显示页面
    return children;
}
