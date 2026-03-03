"use client";

import { useToastStore } from "@/stores/useToastStore";
import { Snackbar } from "./Snackbar";

export function SnackbarContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-9999 flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Snackbar toast={toast} onClose={() => removeToast(toast.id)} />
                </div>
            ))}
        </div>
    );
}
