import "../Admin.css"
import "./ListProductsRes.css"
import CRUD from "../../../services/CRUD";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import sortProductList, { priceFilter, searchMaxValue, searchMinValue } from "../../../utils/sortUtil";
import dataFormatter from "../../../utils/dataFormatter";
import productsToBeDisplayed from "../../../utils/currentProducts";
import { CurrentPageContext } from "../../../contexts/CurrentPageContext";
import { ProductPerPageContext } from "../../../contexts/ProductPerPageContext";
import SortBox from "../../../components/SortBox";
import { SearchedProductsContext } from "../../../contexts/SearchedProductsContext";
import { ProductsContext } from "../../../contexts/ProductsContext";
import ToastContext from "../../../contexts/ToastContext";
import PriceFilter from "../../../components/PriceFilter";
import PaginationTwo from "../../../components/PaginationTwo";
import SearchAdminInput from "../../../components/SearchAdminInput";

export default function ListProducts() {
    const { setToasts } = useContext(ToastContext);
    const [url, setURL] = useSearchParams()
    const [sortState, setSortState] = useState({
        sort: "name",
        order: "asc"
    })
    const { products, setProducts } = useContext(ProductsContext)
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext)
    const { productPerPage } = useContext(ProductPerPageContext)
    const { searchedProducts, setSearchedProducts } = useContext(SearchedProductsContext)
    const [value, setValue] = useState({
        min: 0,
        max: 0
    })
    const { currentProducts, numberOfPages, arrayNumbersOfPages } = productsToBeDisplayed(sortProductList(priceFilter(value.min, value.max, searchedProducts), sortState), productPerPage, currentPage)
    const numberOfPage = Number(url.get("page"))
    const navigate = useNavigate();
    useEffect(() => {
        getAllProducts();

        if (url.get('sort') != null) {
            setSortState(() => ({
                sort: url.get('sort'),
                order: url.get('order')
            }))
        }

        if (url.get('from') != undefined && url.get('to') != undefined) {
            setValue({
                min: url.get('from'),
                max: url.get('to')
            })
        }

        if (numberOfPage != 0 && numberOfPage != 1) {
            setCurrentPage(numberOfPage)
        } else if (numberOfPage == "") {
            setCurrentPage(1)
        } else {
            return
        }

    }, []);

    useEffect(() => {
        setValue({
            min: searchMinValue(products),
            max: searchMaxValue(products)
        })
    }, [products])

    useEffect(() => {

        if (url.get('sort') != null) {
            setURL(`?sort=${sortState.sort}&order=${sortState.order}&page=${currentPage}&from=${value.min}&to=${value.max}`)
        } else if (url.get('from') != value.min && url.get('to') != value.max) {
            setURL(`?sort=${sortState.sort}&order=${sortState.order}&page=${currentPage}&from=${value.min}&to=${value.max}`)
            setValue({
                min: url.get('from'),
                max: url.get('to')
            })
        } else {
            setURL(`?page=${currentPage}`)

        }
    }, [currentPage])

    useEffect(() => {
        setSearchedProducts(sortProductList(searchedProducts, {
            sort: url.get('sort'),
            order: url.get('order')
        }));
        if (numberOfPage == 1) {
            setCurrentPage(numberOfPage)
        }
        if (url.get('from') != null && url.get('to') != null) {
            setValue({
                min: url.get('from'),
                max: url.get('to')
            })
        }
    }, [url])

    const getAllProducts = () => {
        CRUD.read("products")
            .then(data => {
                setProducts(dataFormatter(data))
                setSearchedProducts(
                    url.get('to') != undefined ? priceFilter(url.get('from'), url.get('to'), sortProductList(dataFormatter(data), {
                        sort: url.get('sort'),
                        order: url.get('order')
                    }
                    )) : sortProductList(dataFormatter(data), {
                        sort: url.get('sort'),
                        order: url.get('order')
                    })
                );
                setToasts((toasts) => [...toasts, "Sikeres betöltés!"]);
            }).catch(error => {
                setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
            })
    }

    const modifyProduct = (id) => {
        navigate(`${id}/modositas`);
    };

    const deleteProduct = (id) => {
        navigate(`${id}/torles`);
    };
    return (
        <div className="admin">
            <div className="headlines">
                <h2>Termékek listája</h2>
            </div>
            <SearchAdminInput datas={products} searchedSetter={setSearchedProducts} filteredKey="title" placeholder="Termék keresése..." />
            <div className="admin-options">
                <SortBox sortState={sortState} setSortState={setSortState} />
                <PriceFilter sortState={sortState} value={value} />
            </div>

            <table className="admin-products">
                <thead>
                    <tr>
                        <th className="table-product-name">Termék neve</th>
                        <th className="table-product-price">Ár</th>
                        <th className="table-product-settings" colSpan="2">Kezelőfelület</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(item =>
                    (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>$ {item.price}</td>
                            <td><button className="modify-btn" onClick={() => modifyProduct(item.id)}>Szerkesztés</button></td>
                            <td><button className="delete-btn" onClick={() => deleteProduct(item.id)}>Törlés</button></td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
            <PaginationTwo numberOfPages={numberOfPages} arrayNumbersOfPages={arrayNumbersOfPages} />
        </div>
    )
}