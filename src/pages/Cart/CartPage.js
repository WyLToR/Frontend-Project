import { useContext, useState } from "react";
import CartItem from "../../components/Cart/CartItem";
import { cartContext } from "../../contexts/CartContext";
import "./cartpage.css";
import { AuthContext } from "../../contexts/AuthContext";
import CRUD from "../../services/CRUD";
import dataFormatter from "../../utils/dataFormatter"
import { useNavigate } from "react-router-dom";
import ToastContext from "../../contexts/ToastContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CartPage() {
    const [userName, setUserName] = useState("");
    const { cart, setCart } = useContext(cartContext);
    const { auth } = useContext(AuthContext);
    const { setToasts } = useContext(ToastContext);
    const navigate = useNavigate();

    const path = auth.email ? "users" : "anon";

    const sendOrder = async () => {
        if (!auth.email && !userName) {
            setToasts(toasts => [...toasts, "Hiba: Jelentkezz be vagy add meg a nevedet!"]);
            return;
        }
        const orderedCart = await CRUD.read(`${path}/${auth.id}/cart`);
        const totalCost = dataFormatter(orderedCart).reduce((acc, curr) => acc + Number(curr.price), 0);
        const date = new Date(Date.now()).toISOString();
        const addName = auth.firstName ? `${auth.firstName} ${auth.lastName}` : userName;
        const orderSent = await CRUD.create(`orders`, { products: { ...orderedCart }, date: date, uid: auth.id, name: addName, totalCost: totalCost });
        if (orderSent) {
            setToasts((toasts) => [...toasts, `Sikeres rendelés!`]);
        } else {
            setToasts((toasts) => [...toasts, `Hiba: Sikertelen rendelés!`]);
            return;
        }
        setCart([]);
        if (auth.email) {
            CRUD.create(`users/${auth.id}/orders`, { products: { ...orderedCart }, date: date, totalCost: totalCost });
        }
        CRUD.delete(`${path}/${auth.id}/cart`)
        navigate("/");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendOrder();
    }

    return (
        <div className="cartpage-container">
            <h3>A kosarad tartalma: </h3>
            <ul className="cartpage">
                {
                    cart ? cart.map(cartItem => <CartItem itemInfo={cartItem} />) : <p>Jelenleg üres a kosarad...</p>
                }
            </ul>
            {
                !auth.email ?
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 anon-name">
                            <Form.Label>Név megadása kötelező:</Form.Label>
                            <Form.Control
                                placeholder="Megrendelő neve..."
                                aria-label="Megrendelő neve"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setUserName(e.target.value)}
                            />

                        </Form.Group>
                        <Button type="submit" variant="outline-secondary">Megrendelem</Button>
                    </Form>
                    :
                    <Button className="sendorder-btn" onClick={sendOrder} variant="outline-secondary">Megrendelem</Button>
            }
        </div>
    )
}