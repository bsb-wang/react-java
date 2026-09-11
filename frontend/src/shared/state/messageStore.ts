import { create } from "zustand";

export type MessageType = "success" | "error" | "warning" | "info";

export type MessageOptions = {
    type?: MessageType;
    title?: string;
    message?: string;

    showOk?: boolean;
    showCancel?: boolean;
    showRetry?: boolean;

    onOk?: () => void;
    onCancel?: () => void;
    onRetry?: () => void;
};

type MessageState = {
    open: boolean;
    options: MessageOptions;
    showMessage: (options: MessageOptions) => void;
    closeMessage: () => void;
};

export const useMessageStore = create<MessageState>((set) => ({
    open: false,
    options: {},
    showMessage: (options) =>
        set({
            open: true,
            options,
        }),
    closeMessage: () =>
        set({
            open: false,
            options: {},
        }),
}));
