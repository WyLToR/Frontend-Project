import { cartContext } from "../contexts/CartContext"
import { ProductsContext } from "../contexts/ProductsContext"
import CRUD from "../services/CRUD"
import { useContext } from "react"
import cartFormatter from "../utils/cartFormatter"
import { AuthContext } from "../contexts/AuthContext"
import { Card, Button} from 'react-bootstrap'
import { Link } from "react-router-dom"


function Product({ elem }) {
    const { products } = useContext(ProductsContext);
    const { setCart } = useContext(cartContext)
    const { auth } = useContext(AuthContext);

    const addToCart = (e) => {

        let item = products.filter(product => product.id === e.target.name)

        const path = auth.email ? "users" : "anon";

        CRUD.create(`${path}/${auth.id}/cart`, item[0])
            .then(() => CRUD.read(`${path}/${auth.id}/cart`)
                .then(data => setCart(cartFormatter(data))))
    }

    return (
        <Card bg="secondary" text="light" className="product">
            <Card.Img variant="top" src={elem.imageUrl} />
            <Card.Body className="product-details-cont">
                <Card.Title className="product-title"><Link to={`${elem.id}`}>{elem.title}</Link></Card.Title>
                <Card.Text className="product-desc overflow-hidden">{elem.description}</Card.Text>
            </Card.Body>
            <Card.Body className="product-price mt-5">
                <Card.Text className="price">Ár: {elem.price} Ft</Card.Text>
                <Button className="product-buy-button" variant="primary" name={elem.id} onClick={addToCart}>KOSÁRBA</Button>
            </Card.Body>
        </Card>
    )
}

export default Product