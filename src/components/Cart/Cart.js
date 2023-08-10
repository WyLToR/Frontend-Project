import { useContext, useState } from "react";
import { cartContext } from "../../contexts/CartContext";
import CartItem from "./CartItem";
import "./cart.css";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";

export default function Cart({ showCart, setShowCart }) {
    const { cart } = useContext(cartContext);


    const handleClose = () => setShowCart(false);
    const handleShow = () => setShowCart(true);

    const totalAmount = cart?.reduce((total, cartItem) => total + Number(cartItem.price), 0);

    return (
        <>
            <Offcanvas show={showCart} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Kosár</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart && cart.length > 0 ? (
                        <ul>
                            {cart.map((cartItem) => (
                                <CartItem itemInfo={cartItem} key={cartItem.id} />
                            ))}
                        </ul>
                    ) : (
                        <p>A kosarad jelenleg üres!</p>
                    )}
                    {cart && cart.length > 0 && (
                        <div id="cart-dropdown-summary">
                            <div id="cart-dropdown-total">
                                <span>Total:</span>
                                <span id="cart-dropdown-total-numbers">
                                    {`${Math.ceil(totalAmount)} HUF`}
                                </span>
                            </div>
                            <div id="cart-dropdown-orderpage-link">
                                <Link to="/kosar">Tovább a megrendeléshez</Link>
                            </div>
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
