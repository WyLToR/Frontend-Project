import "./Products.css"
import "./ProductsRes.css"
import Product from "../../components/Product"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import productsToBeDisplayed from "../../utils/currentProducts"
import { CurrentPageContext } from "../../contexts/CurrentPageContext"
import { ProductPerPageContext } from "../../contexts/ProductPerPageContext"
import { SearchBarContext } from "../../contexts/SearchBarContext"
import { SearchedProductsContext } from "../../contexts/SearchedProductsContext"
import { ProductsContext } from "../../contexts/ProductsContext"
import SortBox from "../../components/SortBox"
import sortProductList, { priceFilter, searchMaxValue, searchMinValue } from "../../utils/sortUtil"
import PriceFilter from "../../components/PriceFilter"
import PaginationTwo from "../../components/PaginationTwo"

export default function Products() {
    const { products } = useContext(ProductsContext)
    const { searchedProducts, setSearchedProducts } = useContext(SearchedProductsContext)
    const { search } = useContext(SearchBarContext)
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext)
    const { productPerPage } = useContext(ProductPerPageContext)
    const [url, setUrl] = useSearchParams()
    const [value, setValue] = useState({
        min: 0,
        max: url.get('to') == null ? searchMaxValue(products) : url.get('to')
    })
    const { currentProducts, numberOfPages, arrayNumbersOfPages } = productsToBeDisplayed(
        sortProductList(
            priceFilter(value?.min, value.max, searchedProducts), {
            sort: url.get('sort'),
            order: url.get('order'),
        }), productPerPage, currentPage)
    const numberOfPage = Number(url.get("page"))

    const [sortState, setSortState] = useState({
        sort: url.get('sort') || "name",
        order: url.get('order') || "asc"
    })

    useEffect(() => {
        setValue({
            min: url.get('from') ? url.get('from') : searchMinValue(products),
            max: url.get('to') ? url.get('to') : searchMaxValue(products)
        })
    }, [products])

    useEffect(() => {
        if (numberOfPage != 0 && numberOfPage != 1) {
            setCurrentPage(numberOfPage)
        } else if (numberOfPage == "") {
            setCurrentPage(1)
        }
        else {
            return
        }
        if (url.get('sort') != null && url.get('from') != undefined && url.get('to') != undefined) {
            setSortState(() => ({
                sort: url.get('sort'),
                order: url.get('order')
            }))
            setValue({
                min: url.get('from'),
                max: url.get('to')
            })
        }
    }, [])

    useEffect(() => {
        if (!search) {
            setUrl(`?page=${currentPage}`)
        } else {
            setUrl(`?page=${currentPage}&filter=${search}`)
        }
        if (sortState.sort != null) {
            setUrl(`?sort=${sortState.sort}&order=${sortState.order}&page=${currentPage}&from=${value.min}&to=${value.max}`)
        }
    }, [searchedProducts, currentPage])

    useEffect(() => {
        if (!search) setSearchedProducts(products)
    }, [search])

    useEffect(() => {

        if (numberOfPage == 1) setCurrentPage(numberOfPage)
        if (url.get('from') != null && url.get('to') != null) {
            setValue({
                min: url.get('from'),
                max: url.get('to')
            })
        }
    }, [url])

    return (
        <>
            <h1>Termékek</h1>
            <div className="filter-container">
                <SortBox sortState={sortState} setSortState={setSortState} />
                <PriceFilter sortState={sortState} value={value} />
            </div>
            <div className="products-main-container">
                {currentProducts.length != 0 ? currentProducts.map(elem => {
                    return (
                        <>
                            <Product key={elem.id} elem={elem} />
                        </>
                    )
                })
                    :
                    <h2>Keresés eredménye sikertelen!</h2>
                }
            </div>
            <PaginationTwo numberOfPages={numberOfPages} arrayNumbersOfPages={arrayNumbersOfPages} />
        </>
    )
}