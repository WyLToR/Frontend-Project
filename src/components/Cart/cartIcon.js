
import { BsCart2 } from 'react-icons/bs'
import Cart from './Cart';
import { useContext, useState } from 'react';
import "./cart-keyframes.css"
import { cartContext } from '../../contexts/CartContext';

export default function CartIcon() {

    const [isToggled, setToggled] = useState(false)
    const [animationState, setAnimationState] = useState()
    const { cart } = useContext(cartContext)


    const toggleCart = () => {
        if (!isToggled) {
            setAnimationState('cart-dropdown-fade-in')
            setToggled(!isToggled)
        }
        else {
            setAnimationState('cart-dropdown-fade-out')
            setTimeout(() => {

                setToggled(!isToggled)
            }, 180)
        }
    }

    return (
        <>

            <button id="cart-toggle-btn" onClick={toggleCart}>

                <BsCart2 />

                {cart && <span id="cart-item-count">{cart.reduce((acc, curr) => acc += curr.amount, 0)}</span> }
            </button>


            {
                isToggled ?

                    <div id="cart-dropdown" className={animationState}>
                        <Cart />
                    </div>
                    :
                    null
            }
        </>


    )
}