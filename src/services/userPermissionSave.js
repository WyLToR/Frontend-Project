import { DATABASE_URL } from "../constants/firebaseConfig"
function save(elem, permission) {
    return fetch(`${DATABASE_URL}users/${elem.id}.json`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAdmin: permission })
    })
        .then(res => res.json())
}

export default save