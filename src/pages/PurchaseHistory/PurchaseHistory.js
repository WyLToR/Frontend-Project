import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import dataFormatter from "../../utils/dataFormatter";
import cartFormatter from "../../utils/cartFormatter";
import "./PurchaseHistory.css"
import { dateFormatter } from "../../utils/dateFormatter";
import sortProductList from "../../utils/sortUtil";
import productsToBeDisplayed from "../../utils/currentProducts";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";
import CRUD from "../../services/CRUD";
import PaginationTwo from "../../components/PaginationTwo";
import { ProductPerPageContext } from "../../contexts/ProductPerPageContext";
export default function PurchaseHistory() {

    const { auth } = useContext(AuthContext);
    const [sortState, setSortState] = useState({
        sort: "date",
        order: "desc"
    })
    const [baseUserHistory, setBaseUserHistory] = useState([])
    const [temporaryProducts, setTemporaryProducts] = useState(auth.order ? dataFormatter(baseUserHistory) : []);
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext)
    const { productPerPage } = useContext(ProductPerPageContext)
    const { currentProducts, numberOfPages, arrayNumbersOfPages } = productsToBeDisplayed(sortProductList(temporaryProducts, sortState), productPerPage, currentPage)
    useEffect(() => {
        if (currentPage === "" || currentPage > 1) setCurrentPage(1)
        CRUD.read(`users/${auth.id}/orders`)
            .then(data => {
                if (data) {
                    setBaseUserHistory(data);
                } else {
                    return
                }
            })
    }, [])

    useEffect(() => {
        setTemporaryProducts(cartFormatter(dataFormatter(baseUserHistory)))
    }, [baseUserHistory, currentPage])

    const clickHandler = () => {
        setTemporaryProducts(sortProductList(cartFormatter(dataFormatter(baseUserHistory)), sortState), productPerPage, currentPage)
    }

    const handleSortInputChange = (e) => {
        setSortState({
            ...sortState,
            [e.target.name]: e.target.value
        })
    }

    return (

        auth.email ?
            <>
                <div>
                    <select onChange={handleSortInputChange} name="sort">
                        <option value="date">Dátum</option>
                        <option value="totalcost">Ár</option>
                    </select>
                    <select onChange={handleSortInputChange} name="order">
                        <option value="desc">Csökkenő</option>
                        <option value="asc">Növekvő</option>

                    </select>
                    <button onClick={clickHandler}>Rendezés</button>
                </div>
                <table id="history-table">
                    <thead id="history-table-head">
                        <tr>
                            <th>
                                Vásárlás dátuma
                            </th>
                            <th>
                                Termékek
                            </th>
                            <th>
                                Végösszeg
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            currentProducts ?
                                currentProducts.map(historyItem => {

                                    return (
                                        <tr key={historyItem.id}>
                                            <td>
                                                {dateFormatter(historyItem.date)}


                                            </td>
                                            <td>
                                                <ul className="history-table-product">
                                                    {cartFormatter(historyItem.products).map(product =>
                                                        <li key={product.id}>
                                                            {`${product.title}`}{product.amount > 1 && ` - ${product.amount} db`}
                                                        </li>
                                                    )
                                                    }
                                                </ul>
                                            </td>
                                            <td>
                                                {`${historyItem.totalCost} Ft`}
                                            </td>
                                        </tr>
                                    )
                                }
                                )

                                :

                                <tr>Nincs vásárlási előzményed!</tr>

                        }


                    </tbody>
                </table>
                <PaginationTwo numberOfPages={numberOfPages} arrayNumbersOfPages={arrayNumbersOfPages} />
            </>
            :
            <div id="empty-history">
                <p>A terméktörténet eléréséhez jelentkezz be!</p>
            </div>

    )

}