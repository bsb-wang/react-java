export type ApiResponse<T> = {
    success: boolean;     // 请求是否成功（HTTP 200~299）
    status: number;       // HTTP 状态码
    messages?: string;    // 成功消息（可选）
    errors?: string;      // 错误消息（可选）
    data?: T;             // 返回的数据（可选）
};

const isMock = import.meta.env.VITE_USE_MOCK === "true";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
// 统一处理 API 地址
function resolveUrl(path: string) {
    // mock 时：直接使用 MSW 的虚拟路径，例如 "/login"
    if (isMock) return path;

    // real 时：拼接真实 API 地址，例如 "https://api.example.com/login"
    return `${baseUrl}${path}`;
}

/**
 * 共通API
 * 
 * @param url 
 * @param options 
 * @param timeout 
 * @returns 
 */
export async function http<T>(
    path: string,
    options: RequestInit & { body?: any } = {},
    timeout = 8000
): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const url = resolveUrl(path);

    console.log('url:' + url);

    // ⭐ 自动处理 body（如果是对象 → JSON.stringify）
    let bodyToSend = options.body;
    if (bodyToSend && typeof bodyToSend === "object") {
        bodyToSend = JSON.stringify(bodyToSend);
    }

    try {
        const res = await fetch(url, {
            ...options,
            body: bodyToSend,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });

        clearTimeout(timer);

        const status = res.status;

        let body: any = null;
        try {
            body = await res.json();
        } catch (_) {
            body = null;
        }

        if (!res.ok) {
            return {
                success: false,
                status,
                messages: undefined,
                errors: body?.message || body?.error || "Unknown error",
                data: undefined
            };
        }

        return {
            success: true,
            status,
            messages: body?.message || "OK",
            errors: undefined,
            data: body as T
        };
    } catch (err: any) {
        clearTimeout(timer);

        return {
            success: false,
            status: 0,
            messages: undefined,
            errors:
                err?.name === "AbortError"
                    ? "Request timeout"
                    : err?.message || "Network error",
            data: undefined
        };
    }
}
