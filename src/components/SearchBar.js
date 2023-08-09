import { BiSearchAlt } from "react-icons/bi"
import "./SearchBar.css"
import "./SearchBarRes.css"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SearchBarContext } from "../contexts/SearchBarContext"
import { SearchedProductsContext } from "../contexts/SearchedProductsContext"
import { ProductsContext } from "../contexts/ProductsContext"
function SearchBar() {
    const { products } = useContext(ProductsContext)
    const { search, setSearch } = useContext(SearchBarContext)
    const { setSearchedProducts } = useContext(SearchedProductsContext)
    let navLink = navLinkHandler()
    const navigate = useNavigate()
    const pageIsAdmin = document.URL.includes("admin")

    useEffect(() => {
        setSearchedProducts(products)
    }, [])
    function navLinkHandler() {
        if (search && !document.URL.includes("termekek")) {
            return "termekek?page=1"
        }
        if (search && document.URL.includes("termekek")) {
            return "termekek?page=1"
        }
        if (!search) {
            return "/"
        }
    }

    function searchHandler() {
        if (search) {
            setSearchedProducts(products.filter(elem => {
                if (elem.title.toLowerCase().includes(search)) return elem
                if (elem.title.includes(search)) return elem
            }))
        }
    }
    function searchInputHandler(e) {
        if ((e.key == "Enter" && !document.URL.includes("termekek")) && search) {
            searchHandler()
            navigate("termekek?page=1")
        }
        else if ((e.key == "Enter" && document.URL.includes("termekek")) && search) {
            searchHandler()
            navigate("termekek?page=1")
        }
        else if (e.key == "Enter" && !document.URL.includes("termekek") && !search) {
            navigate("/")
        }
    }
    console.log(pageIsAdmin)

    return (
        <>
            {
                !pageIsAdmin ?
                    <div className="search-container">
                        <input onKeyDown={searchInputHandler} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Keresés..." />
                        <Link to={navLink} onClick={searchHandler}><BiSearchAlt size={40} /></Link>
                    </div>
                    :
                    <div className="search-container"></div>
            }
        </>
    )

}

export default SearchBar