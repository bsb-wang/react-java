import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type MessageType = "success" | "error" | "warning" | "info";

type MessageProps = {
    open: boolean;
    type?: MessageType;
    title?: string;
    message?: string;

    // 按钮控制
    showOk?: boolean;
    showCancel?: boolean;
    showRetry?: boolean;

    onOk?: () => void;
    onCancel?: () => void;
    onRetry?: () => void;

    onClose?: () => void;
};

export function Message({
    open,
    type = "info",
    title = "Message",
    message = "",
    showOk = true,
    showCancel = false,
    showRetry = false,
    onOk,
    onCancel,
    onRetry,
    onClose,
}: MessageProps) {
    const colorMap = {
        success: "text-green-600",
        error: "text-red-600",
        warning: "text-yellow-600",
        info: "text-blue-600",
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={colorMap[type]}>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-3 justify-end">
                    {showCancel && (
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}

                    {showRetry && (
                        <Button variant="secondary" onClick={onRetry}>
                            Retry
                        </Button>
                    )}

                    {showOk && (
                        <Button onClick={onOk}>
                            OK
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
