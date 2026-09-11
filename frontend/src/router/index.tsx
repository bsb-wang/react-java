// src/router/router.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import TopPage from "@/features/top/ui/TopPage";
import LoginPage from "@/features/login/ui/LoginPage";
import RouteGuard from "./guard";
import Error404 from "@/components/common/Error404";
import BookDetail from "@/features/top/ui/BookDetail";
import { lazy } from "react";
import SkillListPage from "@/features/skill/ui/SkillListPage";

const BookList = lazy(() => import("@/features/top/ui/BookList"));

export default function AppRouter() {
    return (
        <Routes>
            {/* 登录页面永远允许访问 */}
            <Route path="/login/show" element={<LoginPage />} />

            <Route path="/" element={<Navigate to="/top" replace />} />

            {/* 其他页面全部加守卫 */}
            <Route
                path="/top"
                element={
                    <RouteGuard>
                        <TopPage />
                    </RouteGuard>
                }
            >
                {/* 默认显示 book-list */}
                <Route index element={<BookList />} />
                <Route path="book-list" element={<BookList />} />
                <Route path="book-detail" element={<BookDetail />} />
            </Route>

            <Route
                path="/top/skill-list"
                element={
                    <RouteGuard>
                        <SkillListPage />
                    </RouteGuard>
                }
            />

            {/* 404 页面：所有未匹配的路径 */}
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}