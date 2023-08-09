import { DATABASE_URL, REG_URL, LOGIN_URL } from "../constants/firebaseConfig"
import loginErrorFormatter from "../utils/loginErrorHandler"
import CRUD from "./CRUD"

export const anonymLogin = async () => {
    try {
        const res = await fetch(REG_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    returnSecureToken: true
                }
            )
        })
        const responseJSON = await res.json()

        if (responseJSON.localId) {
            return registerUserData( "anon", responseJSON.localId, {});
        }

    }
    catch (error) {
        console.log(error);
    }
}

const registerService = async (formData) => {
    try {
        const res = await fetch(REG_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                }
            )
        })

        const responseJSON = await res.json()

        if (responseJSON.localId) {
            return registerUserData( "users", responseJSON.localId, formData)

        } else {
            throw new Error(responseJSON.error.message)

        }


    }
    catch (err) {
        console.log(err.message)
    }
}

const registerUserData = async (endPoint, localId, formData) => {
    try {
        const res = await fetch(`${DATABASE_URL}${endPoint}/${localId}.json`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                { ...formData, id: localId, password: null, passwordAgain: null, isAdmin: false }
            )
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const authenticate = async (email, password, id) => {
    try {
        const res = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
        })
        const authData = await res.json();
        if (authData.error) throw Error(loginErrorFormatter(authData.error.message));
        if (!authData.registered) return;
        const userData = await CRUD.read("users", authData.localId);
        return { authData, userData };
    } catch (error) {
        throw Error(error.message);
    }

}
export const patchUserData=async(userId,userData)=>{
    try{
        const res=await fetch(`${DATABASE_URL}users/${userId}.json`,{
            method: "PUT",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(userData)
        })
    }catch(err){
        console.log(err)
    }
}

export default {
    registerService
}