"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ success: (msg) => addToast(msg, "success"), error: (msg) => addToast(msg, "error") }}>
            {children}
            <div className="fixed top-24 right-4 z-9999 flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-full duration-300 min-w-[300px] ${toast.type === "success"
                            ? "bg-white border-green-100 text-green-800"
                            : "bg-white border-red-100 text-red-800"
                            }`}
                    >
                        {toast.type === "success" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <p className="text-sm font-medium flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
