import { createContext, useState } from "react";

const ToastContext = createContext({});

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    return (
        <ToastContext.Provider value={{ toasts, setToasts }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastContext;
