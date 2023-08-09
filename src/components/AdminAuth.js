import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import NotAllowedPage from "./NotAllowedPage"

function AdminAuth({ children }) {
    const { auth } = useContext(AuthContext)
    return (
        <>
            {JSON.parse(auth.isAdmin) ? children : <NotAllowedPage />}
        </>
    )
}

export default AdminAuth