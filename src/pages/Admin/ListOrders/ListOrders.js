import "./listorders.css"
import CRUD from "../../../services/CRUD";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dataFormatter from "../../../utils/dataFormatter";
import dateTimeFormatter from "../../../utils/dateTimeFormatter";
import PaginationTwo from "../../../components/PaginationTwo";
import productsToBeDisplayed from "../../../utils/currentProducts";
import Button from 'react-bootstrap/Button';
import { CurrentPageContext } from "../../../contexts/CurrentPageContext";
import { ProductPerPageContext } from "../../../contexts/ProductPerPageContext";
import { Col, Container, Row, Table } from "react-bootstrap";
import sortProductList from "../../../utils/sortUtil";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { RiSortAsc, RiSortDesc } from "react-icons/ri"
import SearchAdminInput from "../../../components/SearchAdminInput";

export default function ListOrders() {
    const [orders, setOrders] = useState([])
    const [url, setURL] = useSearchParams()
    const [searchedOrders, setSearchedOrders] = useState([])
    const [sortState, setSortState] = useState("asc")
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext)
    const { productPerPage } = useContext(ProductPerPageContext)
    const { currentProducts, numberOfPages, arrayNumbersOfPages } = productsToBeDisplayed(sortProductList(searchedOrders, { order: url.get("order"), sort: url.get("sort") }), productPerPage, currentPage)
    const navigate = useNavigate();
    const numberOfPage = Number(url.get("page"))
    useEffect(() => {
        getOrders();
        if (numberOfPage != 0 && numberOfPage != 1) {
            setCurrentPage(numberOfPage)
        } else if (numberOfPage == "") {
            setCurrentPage(1)
        } else {
            return
        }
    }, []);

    useEffect(() => {
        url.set("page", currentPage)
        setURL(url)
    }, [currentPage])

    useEffect(() => {
        if (numberOfPage == 1) {
            setCurrentPage(numberOfPage)
        }
    }, [url])

    const getOrders = async () => {
        const data = await CRUD.read(`orders`);
        setOrders(dataFormatter(data));
    }
    const handleUsernameSortChange = (e) => {

        url.set("sort", "username")
        url.set("order", sortState)
        setSortState(prev => prev === "asc" ? "desc" : "asc")
        setURL(url)
    }
    const handleDateSortChange = (e) => {

        url.set("sort", "date")
        url.set("order", sortState)
        setSortState(prev => prev === "asc" ? "desc" : "asc")
        setURL(url)
    }

    return (
        <div className="orderlist">
            <div className="headlines">
                <h2>Rendelések listája</h2>
            </div>
            <SearchAdminInput datas={orders} searchedSetter={setSearchedOrders} filteredKey="name" placeholder="Rendelés keresése..." />
            <Container className=" md-2 mt-2">
                <Row className="justify-content-md-center">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th onClick={handleDateSortChange}>Dátum {url.get("sort") === "date" && sortState === "asc" ? <RiSortAsc /> : <RiSortDesc />}</th>
                                    <th onClick={handleUsernameSortChange}>Vásárló neve{url.get("sort") === "username" && sortState === "asc" ? <AiOutlineSortDescending /> : <AiOutlineSortAscending />}</th>
                                    <th>Végösszeg</th>
                                    <th>Részletek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts?.map(order => (
                                    <tr key={order.id}>
                                        <td>{dateTimeFormatter(order.date)}</td>
                                        <td>{order.name}</td>
                                        <td>{order.totalCost} HUF</td>
                                        <td ><Button variant="secondary" onClick={() => navigate(`/admin/rendeles/${order.id}`)}>Rendelés részletei</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <PaginationTwo numberOfPages={numberOfPages} arrayNumbersOfPages={arrayNumbersOfPages} />
        </div>
    )
}