import React, { useContext } from "react";
import Toast from "./Toast";
import ToastContext from "../../contexts/ToastContext";
import "./ToastContainer.css"

const ToastContainer = () => {
    const { toasts, setToasts } = useContext(ToastContext);

    const handleCloseToast = (index) => {
        setToasts((prevToasts) => {
            const newToasts = [...prevToasts];
            newToasts.splice(index, 1);
            return newToasts;
        });
    };

    return (
        <div className="toast-container">
            {toasts.map((message, index) => (
                <Toast key={index} message={message} closeToast={() => handleCloseToast(index)} />
            ))}
        </div>
    );
};

export default ToastContainer;
