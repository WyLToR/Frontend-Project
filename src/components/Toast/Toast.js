import React, { useEffect } from "react";
import "./Toast.css"

const Toast = ({ message, closeToast}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            closeToast();
        }, 2000);
        return () => clearTimeout(timer);
    }, [closeToast]);

    return (
        <div className={message.includes("Hiba") ? "ourtoast error" : "ourtoast success"}>
            <p>{message}</p>
        </div>
    );
};

export default Toast;
