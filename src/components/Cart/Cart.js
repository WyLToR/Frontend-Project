import { useContext } from "react"
import { cartContext } from "../../contexts/CartContext"
import CartItem from "./CartItem"
import "./cart.css"
import { Link } from "react-router-dom"

export default function Cart() {

    const { cart, setCart } = useContext(cartContext)

    return (
        <div id="cart-item-list">
            <ul>
                {
                    cart ?

                        cart.map(cartItem => <CartItem itemInfo={cartItem} />)

                        :

                        <div id="cart-item-list-placeholder"><p>A kosarad jelengleg üres!</p></div>
                }
            </ul>
            {
                cart &&
                <div id="cart-dropdown-summary">
                    <div id="cart-dropdown-total">
                        <span>Total:</span>
                        <span id="cart-dropdown-total-numbers">{cart ? `${Math.ceil(cart.reduce((acc, curr) => acc += Number(curr.price), 0))} HUF` : "0 $"}</span>

                    </div>
                    <div id="cart-dropdown-orderpage-link">
                        <Link to="/kosar">Tovább a megrendeléshez</Link>
                    </div>

                </div>

            }

        </div>
    )



}