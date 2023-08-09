import validator from "validator"
import { ZIPAPI } from "../constants/otherAPI"

const registerValidator = {
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
    password: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        },
        {
            isValid: (value) => validator.isStrongPassword(value),
            message: "Nem elég erős a jelszó",
        },
    ],
    passwordAgain: [
        {
            isValid: (value) => !validator.isEmpty(value),
            message: "kitöltés kötelező",
        },
        {
            isValid: (value, value2) => value === value2,
            message: "Nem egyezik a két jelszó",
        },
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
    ]
}

export const getInfoFromApi = async (data) => {
    const getter = await fetch(`${ZIPAPI}${data}.json`)
    const resp = await getter.json()
    if (resp.zips.length == 1) {
        console.log(resp.zips)
    } else if (resp.zips.length > 1) {
        console.log(resp.zips)
    } else {
        return false
    }
}


export default registerValidator