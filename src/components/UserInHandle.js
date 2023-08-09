import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import save from '../services/userPermissionSave';
import { useNavigate } from 'react-router-dom';
function UserInHandle({ users, setUsers, elem, idx }) {
    const [permission, setPermission] = useState("")
    const navigate = useNavigate()

    function deleteUser(id) {
        navigate(`${id}/torles`)
    }

    function saveHandler() {
        save(elem, permission)
        setPermission("")
        const newUsers = users.map(user => user.id === elem.id ? { ...user, isAdmin: permission } : user)
        setUsers(newUsers)
    }

    return (
        <tr key={elem.id}>
            <td>{idx + 1}</td>
            <td>{elem.firstName}</td>
            <td>{elem.lastName}</td>
            <td>{elem.username}</td>
            <td>{elem.email}</td>
            <td>
                <Form.Select defaultValue={JSON.parse(elem.isAdmin)} onChange={(e) => setPermission(e.target.value)} aria-label="Default select example">
                    <option value={false}>Felhasználó</option>
                    <option value={true}>Admin</option>
                </Form.Select>
            </td>
            <td>{permission != "" ? <><Button onClick={saveHandler} variant="success">Mentés</Button> <Button variant="danger">Törlés</Button></> : <Button onClick={() => deleteUser(elem.id)} variant="danger">Törlés</Button>}</td>
        </tr>
    )
}

export default UserInHandle