import { useContext } from "react"
import CRUD from "../../services/CRUD"
import { cartContext } from "../../contexts/CartContext"
import cartFormatter from "../../utils/cartFormatter"
import { AuthContext } from "../../contexts/AuthContext"

export default function CartItem({ itemInfo }) {

    const { setCart } = useContext(cartContext)
    const { auth } = useContext(AuthContext);

    const path = auth.email ? "users" : "anon";

    const deleteCartItem = (e) => {

            CRUD.delete(`${path}/${auth.id}/cart/${e.target.dataset.cartid}`)
            .then(() => CRUD.read(`${path}/${auth.id}/cart`)
                .then(data => setCart(cartFormatter(data))))
    }

    return (
        <li >
            <h4 className="cart-item-title">{itemInfo.title}</h4>
            <div className="cart-item-info">
                <span>{itemInfo.amount} db</span>

                <span>{itemInfo.price} HUF</span>
                <button data-cartid={itemInfo.cartId} onClick={deleteCartItem} className="cart-item-delete-btn">X</button>
            </div>
        </li>
    )
}