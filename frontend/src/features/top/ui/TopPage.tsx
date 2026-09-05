import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

export default function TopPage() {
    return (
        <>
            <div>TopPage</div>
            <nav className="w-full bg-white shadow-sm px-4 py-3 flex items-center gap-4">
                <Link to="/top/book-list">
                    <Button variant="ghost">书籍列表</Button>
                </Link>

                <Link to="/top/book-detail">
                    <Button variant="ghost">书籍详情</Button>
                </Link>
            </nav>
            <hr></hr>
            <Suspense fallback={<div className="p-4">加载中...</div>}>
                <Outlet></Outlet>
            </Suspense>

        </>
    )
}