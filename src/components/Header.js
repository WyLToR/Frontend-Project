import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"
import CartIcon from "./Cart/cartIcon"
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { saveToLocalStorage } from "../services/localStorageHandler";
import "./Header.css"
import { cartContext } from "../contexts/CartContext";
import logo from "../assets/images/logo.png"

export default function Header() {

    const { auth, setAuth } = useContext(AuthContext);
    const { setCart } = useContext(cartContext);
    const [toggled, setToggled] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        saveToLocalStorage(null);
        setAuth({});
        setCart([])
        navigate("/")
    }

    return (
        <header>
            <nav className="header-nav">
                <div className="header-nav-menu-option">
                    <div>
                        <img className="logo" src={logo} />
                    </div>
                </div>
                <SearchBar />
                <div className="main-nav-links">
                    <ul>
                        <li><Link to="/">Főoldal</Link></li>
                        <li><Link to="/termekek/?page=1">Termékek</Link></li>
                        {/* <li><Link to="/kosar">Kosaram</Link></li> */}
                        {/* <li><Link to="/admin">Admin</Link></li> */}
                        {auth.firstName ?
                            <>
                                <button onClick={() => setToggled(!toggled)}>Felhasználó</button>
                                {toggled ?
                                    <div className="user-profile">
                                        <ul>
                                            <li>Üdv {auth.firstName}!</li>
                                            <li><Link to={`/felhasznalo/${auth.id}`}>Beállítások</Link></li>
                                            <li><button className="logout" onClick={logout}>Kijelentkezés</button></li>
                                        </ul>
                                    </div>
                                    : null
                                }
                            </>
                            :
                            <>
                                <li><Link to="/regisztracio">Regisztráció</Link></li>
                                <li><Link to="/belepes">Bejelentkezés</Link></li>
                            </>
                        }
                        <li><CartIcon /></li>
                    </ul>
                </div>
            </nav>
        </header>

    )
}