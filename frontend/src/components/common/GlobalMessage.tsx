import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/shared/state/messageStore";

export function GlobalMessage() {
    const { open, options, closeMessage } = useMessageStore();

    const {
        type = "info",
        title = "Message",
        message = "",
        showOk = true,
        showCancel = false,
        showRetry = false,
        onOk,
        onCancel,
        onRetry,
    } = options;

    const colorMap = {
        success: "text-green-600",
        error: "text-red-600",
        warning: "text-yellow-600",
        info: "text-blue-600",
    };

    return (
        <Dialog open={open} onOpenChange={closeMessage} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={colorMap[type]}>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-3 justify-end">
                    {showCancel && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                onCancel?.();
                                closeMessage();
                            }}
                        >
                            Cancel
                        </Button>
                    )}

                    {showRetry && (
                        <Button
                            variant="secondary"
                            onClick={() => {
                                onRetry?.();
                                closeMessage();
                            }}
                        >
                            Retry
                        </Button>
                    )}

                    {showOk && (
                        <Button
                            onClick={() => {
                                onOk?.();
                                closeMessage();
                            }}
                        >
                            OK
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
