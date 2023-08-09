import validator from "validator"
import { ZIPAPI } from "../constants/otherAPI"

const validateUser = {
    email: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        },
        {
            isValid: (value) => validator.isEmail(value),
            message: "Ez nem email cím!",
        }
    ],
    lastName: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        }
    ],
    firstName: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        }
    ],
    userName: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        },
        {
            isValid: (value) => value.length > 3,
            message: "Legyen 3 karakternél hosszabb",
        }
    ],
    zipCode: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező"
        },
        {
            isValid: (value) => validator.isNumeric(value.toString()) && value.length == 4,
            message: "Magyarországi irányítószámok 4 számjegyűek"
        }
    ],
    city: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "Ilyen település nem létezik"
        }
    ],
    street: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező"
        }
    ],
    houseNumber: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező"
        }
    ]

}


export default validateUser