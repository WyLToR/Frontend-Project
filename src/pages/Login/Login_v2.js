import "./Login.css"
import "./LoginRes.css"
import { useContext, useEffect, useState } from "react";
import ToastContext from "../../contexts/ToastContext"
import { authenticate } from "../../services/authServices";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../services/localStorageHandler";
import { cartContext } from "../../contexts/CartContext";
import CRUD from "../../services/CRUD";
import cartFormatter from "../../utils/cartFormatter";
import ValidatedInput from "../../components/ValidatedInput";
import useValidate from "../../hooks/useValidate";
import loginValidator from "../../validator/loginValidator";
import { Button } from "react-bootstrap";

const initialValue = {
    email: {
        value: "",
        isValid: false
    },
    loginPassword: {
        value: "",
        isValid: false
    }
}


export default function Login2() {
    const { formInputs, setFormInputs, handleChange, isValid, reset, formData, checkValidate } = useValidate(initialValue, loginValidator)

    const { cart, setCart } = useContext(cartContext);
    const { auth, setAuth } = useContext(AuthContext);
    const { setToasts } = useContext(ToastContext);
    const navigate = useNavigate();


    console.log(formInputs)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
       
        if (checkValidate()) {
            try {
                const { authData, userData } = await authenticate(formData.email, formData.loginPassword, auth.id)
                if (authData.registered) {
                    const transferCart = await CRUD.read(`anon/${auth.id}/cart`);
                    const cartTransfered = await CRUD.patch(`users/${authData.localId}/cart`, transferCart);
                    if (cartTransfered) {
                        const newcart = CRUD.read(`users/${authData.id}/cart`)
                        setCart(cartFormatter(newcart))
                    }
                    setToasts((toasts) => [...toasts, "Sikeres bejelentkezés"]);
                    setAuth(userData);
                    saveToLocalStorage(userData);
                    navigate("/");
                } else {
                    setToasts((toasts) => [...toasts, "Hiba: Sikertelen bejelentkezés"]);
                }
            } catch (error) {
                setToasts((toasts) => [...toasts, "Hiba: " + error.message]);
            }

        }


    }

    return (
        <div id="login-panel" onSubmit={(e) => handleFormSubmit(e)}>
            <Form onSubmit={handleFormSubmit}>
                <ValidatedInput
                    type="text"
                    name="email"
                    onChange={handleChange}
                    values={formInputs}
                    label="Email cím"
                    setFormInputs={setFormInputs}
                    validator={loginValidator}
                />
                <ValidatedInput
                    type="password"
                    name="loginPassword"
                    onChange={handleChange}
                    values={formInputs}
                    label="Jelszó"
                    setFormInputs={setFormInputs}
                    validator={loginValidator}
                />
                <Button className="mt-3" type="submit" variant="outline-success">Bejelentkezés</Button>
            </Form >
        </div>
    )
}