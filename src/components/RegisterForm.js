import { useContext, useState } from "react";
import "./RegisterForm.css"

import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";
import ToastContext from "../contexts/ToastContext";

import ValidatedInput from "./ValidatedInput";
import useValidate from "../hooks/useValidate";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import registerValidator from "../validator/registerValidator.js";

const initialValues = {
    email: {
        value: "",
        isValid: false
    },
    password: {
        value: "",
        isValid: false
    },
    lastName: {
        value: "",
        isValid: false
    },
    firstName: {
        value: "",
        isValid: false
    },
    userName: {
        value: "",
        isValid: false
    },
    passwordAgain: {
        value: "",
        isValid: false
    }

}


export default function RegisterForm() {
    const { setToasts } = useContext(ToastContext);
    const navigate = useNavigate();
    const { formInputs, setFormInputs, handleChange, isValid, reset, formData, checkValidate } = useValidate(initialValues, registerValidator)



    const handleSubmit = (e) => {
        e.preventDefault();


        if (checkValidate()) {
            authServices.registerService(formData)
                .then((data) => {
                    if (data != undefined) {
                        setToasts((toasts) => [...toasts, "Sikeres regisztráció!"]);
                        navigate("/belepes");

                    } else {
                        setToasts((toasts) => [...toasts, "Hiba: sikertelen regisztráció!"]);

                    }
                })

        } else {
            setToasts((toasts) => [...toasts, "Hiba: Hibás kitöltés!"]);
        }

    }
    
    return (
        <>
            <h1>Regisztráció</h1>
            <div id="register-box">
                <Form onSubmit={handleSubmit}>

                    <ValidatedInput
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        values={formInputs}
                        label="Keresztnév"
                        setFormInputs={setFormInputs}
                        validator={registerValidator}
                    />
                    <ValidatedInput
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        values={formInputs}
                        label="Vezetéknév"
                        setFormInputs={setFormInputs}
                        validator={registerValidator}
                    />

                    <ValidatedInput
                        type="text"
                        name="userName"
                        onChange={handleChange}
                        values={formInputs}
                        label="Felhasználónév"
                        setFormInputs={setFormInputs}
                        validator={registerValidator}
                    />
                    <ValidatedInput
                        type="email"
                        name="email"
                        onChange={handleChange}
                        values={formInputs}
                        label="E-mail"
                        setFormInputs={setFormInputs}
                        validator={registerValidator}
                    />
                    <ValidatedInput
                        type="password"
                        name="password"
                        onChange={handleChange}
                        values={formInputs}
                        label="Jelszó"
                        setFormInputs={setFormInputs}
                        validator={registerValidator}
                    />
                    <ValidatedInput
                        type="password"
                        name="passwordAgain"
                        onChange={handleChange}
                        values={formInputs}
                        label="Jelszó újra"
                        setFormInputs={setFormInputs}
                        validator={registerValidator}
                    />

                    <Button className="mt-3" type="submit" variant="outline-success">Regisztrálok!</Button>
                </Form>
            </div>
        </>
    )
}