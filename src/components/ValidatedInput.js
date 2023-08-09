import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";


export default function ValidatedInput({ label, type, name, values, onChange, setFormInputs, validator }) {

    const [isValidInput, setIsValidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isTouched, setIsTouched] = useState(false)

    const handleValidate = () => {
        setIsTouched(true);
        console.log(validator)
        const invalid = validator[name].find(validatorFn => !validatorFn.isValid(values[name].value, values.password?.value))
      
        if (invalid) {
            setIsValidInput(false)
            setErrorMessage(invalid.message)
        } else {
            setIsValidInput(true);
            setErrorMessage("");
        }

    }
 
    const realTimeValidate = (e) => {
        if (isTouched) handleValidate();
        onChange(e);
    }

    useEffect(() => {
        setFormInputs(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                isValid: isValidInput
            }

        }))
    }, [isValidInput])
    
    useEffect(() => {
        if (values[name].value === "") {
            setIsValidInput(false);
            setIsTouched(false)
        }
    }, [values[name].isValid])



    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                value={values ? values[name]?.value : undefined}
                onChange={realTimeValidate}
                isValid={isValidInput}
                isInvalid={errorMessage ? true : false}
                onBlur={handleValidate}
            />
            <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>
        </Form.Group>
    )
}