import { useContext, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import "./UserProfile.css"
export default function UserProfile() {
    const { auth, setAuth } = useContext(AuthContext);
    return (
        <>
        <div className="usersettings-page">
            <div className="userprofile-options">
                <ul>
                    <li>
                        <Link to={`/felhasznalo/${auth.id}/rendelesek`}>Rendelések</Link>
                    </li>
                    <li>
                        <Link to={`/felhasznalo/${auth.id}/beallitasok`}>Beállítások</Link>
                    </li>
                    {JSON.parse(auth.isAdmin) ?
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li> :
                        null
                    }
                </ul>
            </div>
            <div className="choosed">
                <Outlet />
            </div>
        </div>
        </>
    )
}