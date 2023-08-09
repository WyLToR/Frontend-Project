import validator from "validator"

const loginValidator = {
    email: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező!"
        },

    ],
    loginPassword: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        }
    ]
}

export default loginValidator