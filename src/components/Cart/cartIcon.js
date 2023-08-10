
import { BsCart2 } from 'react-icons/bs'
import Cart from './Cart';
import { useContext, useState } from 'react';
import "./cart-keyframes.css"
import { cartContext } from '../../contexts/CartContext';

export default function CartIcon() {

    const { cart } = useContext(cartContext)
    const [showCart, setShowCart] = useState(false)

    return (
        <>

            <button id="cart-toggle-btn" onClick={() => setShowCart(true)}>

                <BsCart2 />

                {cart && <span id="cart-item-count">{cart.reduce((acc, curr) => acc += curr.amount, 0)}</span>}
            </button>


            {
                <Cart showCart={showCart} setShowCart={setShowCart} />
            }
        </>


    )
}