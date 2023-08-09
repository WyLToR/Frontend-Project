import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CRUD from "../../../services/CRUD";
import cartFormatter from "../../../utils/cartFormatter";
import "./orderdetails.css"
import dateTimeFormatter from "../../../utils/dateTimeFormatter";
import { Stack, Button, ListGroup, Badge, Alert, Modal, Container, Row, Col } from "react-bootstrap"

export default function OrderDetails() {
    const { orderid } = useParams();
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getOrderDetails();
    }, []);

    const getOrderDetails = async () => {
        const data = await CRUD.read(`orders/${orderid}`);
        setOrder(data);
    }

    const deleteOrder = () => {
        CRUD.delete("orders", orderid);
        navigate("/admin/rendelesek");
    }

    return (
        <Container className=" md-3 mt-3">
            <Row className="justify-content-md-center">
                <Col>
                    <Alert variant="primary">
                        <Alert.Heading>RENDELÉS RÉSZLETEI:</Alert.Heading>
                        <p>
                            Rendelés dátuma: {dateTimeFormatter(order.date)}
                        </p>
                        <hr />
                        <p className="mb-0">
                            <p>Megrendelő: {order.name}</p>
                        </p>
                    </Alert>
                    {
                        cartFormatter(order.products)?.map(product =>
                            <ListGroup key={product.id}>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start mt-1"
                                >
                                    <Badge bg="primary" pill>
                                        {product.amount}
                                    </Badge>
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{product.title}</div>
                                        Részösszeg: {product.price} HUF
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        )
                    }
                    <Alert className="mt-4" variant="primary">
                        ÖSSZESEN: {order.totalCost} HUF
                    </Alert>
                    <Stack direction="horizontal" gap={3}>
                        <Button onClick={() => navigate("/admin/rendelesek")}>Vissza</Button>
                        <Button variant="danger" onClick={() => setShowModal(true)}>Rendelés törlése</Button>
                    </Stack>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Biztosan törlöd a rendelést?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>A törlés végleges, nem visszavonható!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Mégse</Button>
                            <Button variant="danger" onClick={deleteOrder}>Törlés</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    )
}