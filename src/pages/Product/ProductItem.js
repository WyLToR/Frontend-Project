import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CRUD from "../../services/CRUD";
import { cartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import cartFormatter from "../../utils/cartFormatter";
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
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
            <Container className="productItem-item d-flex justify-content-center align-items-center">
                <div className="productItem p-4 border rounded">
                    <Row className="text-center mb-4">
                        <Col>
                            <h1>{product?.title}</h1>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col xs={3} className="text-center">
                            <Image src={product?.imageUrl} className="img-fluid border rounded" width="100%" alt="Product" />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                <Col xs={12}>
                                    <p>{product?.description}</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={12}>
                                    <Button variant="primary" block onClick={addToCart}>Kosárba</Button>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs={12}>
                                    <h3>{product?.price} Ft</h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>

        </>
    )
}