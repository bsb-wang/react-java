// src/router/guard.tsx
import Error401 from "@/components/common/Error401";
import { useAuthStore } from "@/shared/state/authStore";
import type { JSX } from "react/jsx-runtime";



export default function RouteGuard({ children }: { children: JSX.Element }) {

    // 模拟登录状态，你可以改成从 store / cookie / localStorage 读取
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


    // 如果未登录 → 显示 401 页面
    if (!isLoggedIn) {
        return <Error401 />;
    }

    // 已登录 → 正常显示页面
    return children;
}
