import { useContext, useEffect, useState } from "react";
import { ZIPAPI } from "../constants/otherAPI";
import { states } from "../constants/states";
import { AuthContext } from "../contexts/AuthContext";
import ToastContext from "../contexts/ToastContext";
import { patchUserData } from "../services/authServices";
import { saveToLocalStorage } from "../services/localStorageHandler";
import { baseNameReader } from "../utils/userSettingBaseReader";
import "./UserSettings.css"
import Form from "react-bootstrap/Form";
import FormRange from "react-bootstrap/esm/FormRange";
import useValidate from "../hooks/useValidate";
import ValidatedInput from "./ValidatedInput";
import Button from "react-bootstrap/Button"

import validateUser from "../validator/userSettingsValidator";
const initialValue = {
    email: {
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
    zipCode: {
        value: "",
        isValid: false,
    },
    city: {
        value: "",
        isValid: false,
    },
    street: {
        value: "",
        isValid: false,
    },
    houseNumber: {
        value: "",
        isValid: false,
    }
}
export default function UserSettings() {
    const { auth, setAuth } = useContext(AuthContext);
    const [data, setData] = useState(auth)
    const { formInputs, setFormInputs, handleChange, isValid, reset, formData, checkValidate } = useValidate(initialValue, validateUser)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkValidate()) {
            patchUserData(formData.id, formData)
            saveToLocalStorage(formData)
        }
    }
    useEffect(() => {
        let result = {};
        Object.entries(data).forEach(m => (
            result =
        {
            ...result,
            [m[0]]: {
                value: m[1],
                isValid: true
            }
        }))
        setFormInputs({...formInputs,...result})
    }, [])
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <ValidatedInput
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    values={formInputs}
                    label="Keresztnév"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <ValidatedInput
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    values={formInputs}
                    label="Vezetéknév"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <ValidatedInput
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    values={formInputs}
                    label="Felhasználónév"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <ValidatedInput
                    type="email"
                    name="email"
                    onChange={handleChange}
                    values={formInputs}
                    label="E-mail"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <Form.Label>Szállítási adatok</Form.Label>
                <ValidatedInput
                    type="text"
                    name={"zipCode"}
                    onChange={handleChange}
                    values={formInputs}
                    label="Irányítószám"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <ValidatedInput
                    type="text"
                    name={"city"}
                    onChange={handleChange}
                    values={formInputs}
                    label="Város"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <ValidatedInput
                    type="text"
                    name={"street"}
                    onChange={handleChange}
                    values={formInputs}
                    label="Utca"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <ValidatedInput
                    type="text"
                    name={"houseNumber"}
                    onChange={handleChange}
                    values={formInputs}
                    label="Házszám"
                    setFormInputs={setFormInputs}
                    validator={validateUser}
                />
                <Button className="mt-4" type="submit">Módosítás</Button>
            </Form>
        </div >
    )

}