import "./Login.css"
import "./LoginRes.css"
import { useContext, useEffect, useState } from "react";
import ToastContext from "../../contexts/ToastContext"
import { authenticate } from "../../services/authServices";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../services/localStorageHandler";
import { cartContext } from "../../contexts/CartContext";
import CRUD from "../../services/CRUD";
import cartFormatter from "../../utils/cartFormatter";

export default function Login() {
    const { cart, setCart } = useContext(cartContext);
    const { auth, setAuth } = useContext(AuthContext);
    const { setToasts } = useContext(ToastContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setForm(prevForm => (
            {
                ...prevForm,
                [id]: value,
            }))
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { authData, userData } = await authenticate(form.email, form.password, auth.id)
            if (authData.registered) {
                const transferCart = await CRUD.read(`anon/${auth.id}/cart`);
                const cartTransfered = await CRUD.patch(`users/${authData.localId}/cart`, transferCart);
                if(cartTransfered) {
                    const newcart = CRUD.read(`users/${authData.id}/cart`)
                    setCart(cartFormatter(newcart))
                } 
                setToasts((toasts) => [...toasts, "Sikeres bejelentkezés"]);
                setAuth(userData);
                saveToLocalStorage(userData);
                navigate("/");
            } else {
                setToasts((toasts) => [...toasts, "Hiba: Sikertelen bejelentkezés"]);
            }
        } catch (error) {
            setToasts((toasts) => [...toasts, "Hiba: " + error.message]);
        }
        
       
    }

    return (
        <div className="login-panel" onSubmit={(e) => handleFormSubmit(e)}>
            <form className="login-form">
                <div className="input-form">
                    <label htmlFor="email">Email cím:</label>
                    <input id="email" type="email" onChange={handleInputChange} value={form.email} />
                </div>
                <div className="input-form">
                    <label htmlFor="password">Jelszó:</label>
                    <input id="password" type="password" onChange={handleInputChange} value={form.password} />
                </div>
                <button>Bejelentkezés</button>
                {/* <div className="rememberme-form">
            <input type="checkbox" /><span>Jegyezz meg</span>
            </div> */}
            </form>
        </div>
    )
}