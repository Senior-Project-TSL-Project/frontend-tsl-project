import { create } from 'zustand';

export interface Toast {
    id: string;
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id }]
        }));
        
        // Auto remove after duration
        const duration = toast.duration ?? 3000;
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id)
            }));
        }, duration);
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id)
        }));
    }
}));

// Utility function for easy toast calling
export const toast = (message: string, options?: { type?: Toast['type']; duration?: number }) => {
    useToastStore.getState().addToast({
        message,
        type: options?.type ?? 'info',
        duration: options?.duration
    });
};
