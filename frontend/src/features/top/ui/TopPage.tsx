import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/shared/state/authStore";
import { Suspense } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function TopPage() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);


    const handleLogout = () => {
        logout();
        navigate("/login/show");
    };

    return (
        <>
            <div className="w-full min-h-screen flex flex-col">
                <div className="w-full flex justify-between items-center px-6 py-4 border-b">
                    <div className="text-xl font-bold">TOP</div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {user?.name ?? ""}
                        </span>

                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <nav className="w-full bg-white shadow-sm px-4 py-3 flex items-center gap-4">
                    <Link to="/top/book-list">
                        <Button variant="ghost">书籍列表</Button>
                    </Link>

                    <Link to="/top/book-detail">
                        <Button variant="ghost">书籍详情</Button>
                    </Link>
                </nav>

                {/* Content */}
                <hr></hr>
                <div className="flex-1 p-6">
                    <Suspense fallback={<div className="p-4">加载中...</div>}>
                        <Outlet></Outlet>
                    </Suspense>
                </div>

            </div>

        </>
    )
}