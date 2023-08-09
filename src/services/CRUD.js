import { DATABASE_URL } from "../constants/firebaseConfig"

export default {
    create: async function (endpoint, formData) {
        try {
            const res = await fetch(`${DATABASE_URL}${endpoint}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw Error("Nem sikerült létrehozni! ");
            }
            return await res.json();
        } catch (error) {
            throw Error("Nem sikerült létrehozni! ");
        }
    },

    read: async function (endpoint, id) {
        if (!id) id = "";
        try {
            const res = await fetch(`${DATABASE_URL}${endpoint}/${id}.json`);
            if (!res.ok) {
                throw Error("Sikertelen betöltés! ");
            }
            return await res.json();
        } catch (error) {
            throw Error("Sikertelen betöltés! ");
        }
    },

    update: async function (productDetails) {
        try {
            const res = await fetch(`${DATABASE_URL}products/${productDetails.id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(productDetails)
            });
            if (!res.ok) {
                throw Error("Sikertelen szerkesztés! ");
            }
            return await res.json();
        } catch (error) {
            throw Error("Sikertelen szerkesztés! ");
        }
    },

    delete: async function (endpoint, id) {
        if (!id) id = "";

        try {
            const res = await fetch(`${DATABASE_URL}${endpoint}/${id}.json`, {
                method: 'DELETE'
            });
            console.log(res)
            if (!res.ok) {
                throw Error("Sikertelen törlés! ");
            }
            return await res.json();
        } catch (error) {
            throw Error("Sikertelen törlés! ");
        }
    },
    patch: async function (endpoint, formData) {
        try {
            const res = await fetch(`${DATABASE_URL}${endpoint}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw Error("Nem sikerült létrehozni! ");
            }
            return await res.json();
        } catch (error) {
            throw Error("Nem sikerült létrehozni! ");
        }
    },
}
