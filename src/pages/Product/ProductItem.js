import { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import CRUD from "../../services/CRUD";
import { Link } from "react-router-dom"
import "./ProductItem.css"
import { cartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import cartFormatter from "../../utils/cartFormatter";
export default function ProductItem() {
    const param = useParams()
    const [product, setProduct] = useState()
    const { cart, setCart } = useContext(cartContext)
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        CRUD.read("products", param.id)
            .then(data => setProduct(data))

    }, [])
    const addToCart = () => {

        let item = product

        const path = auth.email ? "users" : "anon";

        CRUD.create(`${path}/${auth.id}/cart`, product)
            .then(() => CRUD.read(`${path}/${auth.id}/cart`)
                .then(data => setCart(cartFormatter(data))))
    }
    useEffect(() => {
        console.log(product)
    }, [product])
    return (
        <>
            <main className="productItem-item">
                <div className="productItem">
                    <div className="productItem-title">
                        <h1>{product?.title}</h1>
                    </div>
                    <div className="productItem-img">
                        <img src={product?.imageUrl} width="250px" />
                    </div>
                    <div className="productItem-description">
                        <h2>Leírás:</h2>
                        <p>{product?.description}</p>
                    </div>
                    <div className="productItem-price">
                        <h3>{product?.price}</h3>
                    </div>
                    <div className="productItem-addtoCart">
                        <button onClick={addToCart}>Kosárba</button>
                    </div>
                </div>
            </main>

        </>
    )
}