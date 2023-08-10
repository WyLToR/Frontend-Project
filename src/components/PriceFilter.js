import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { searchMaxValue, searchMinValue } from "../utils/sortUtil";
import { Form, Row, Col, Button } from 'react-bootstrap'
import "./PriceFilter.css"

export default function PriceFilter({ sortState }) {
    const { currentPage } = useContext(CurrentPageContext)
    const { products } = useContext(ProductsContext)
    const [param, setParam] = useSearchParams();
    const [value, setValue] = useState({
        min: 0,
        max: 0
    })

    useEffect(() => {
        setValue({
            min: param.get('from') != null ? param.get('from') : searchMinValue(products),
            max: param.get('to') != null ? param.get('to') : searchMaxValue(products)
        })
    }, [products])

    const handleFilter = () => {
        setParam(`?sort=${sortState.sort}&order=${sortState.order}&page=${currentPage}&from=${value.min}&to=${value.max}`)
    }

    return (
        <div className="price-filter-container">
            <Form>
                <Row className="align-items-center">
                    <Col>
                        <Form.Group controlId="minPrice">
                            <Form.Control
                                type="number"
                                max={value.max}
                                value={value.min}
                                onChange={(e) => {
                                    setValue({ ...value, min: Number(e.target.value) });
                                }}
                                step={10}
                            />
                            <Form.Text>-TÓL</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="maxPrice">
                            <Form.Control
                                type="number"
                                max={value.max}
                                value={value.max}
                                onChange={(e) => {
                                    setValue({ ...value, max: Number(e.target.value) });
                                }}
                                step={10}
                            />
                            <Form.Text>-IG</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleFilter}>Szűrés</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}