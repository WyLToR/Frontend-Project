import { useContext } from "react"
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { useSearchParams } from "react-router-dom";
import "./SortBox.css"


export default function SortBox({ sortState, setSortState }) {

    const { currentPage } = useContext(CurrentPageContext)
    const [url, setURL] = useSearchParams()

    const handleSortInput = (e) => {
        setSortState({
            ...sortState,
            [e.target.name]: e.target.value
        })

    }

    return (
        <div className="sort-container">
            <select onChange={handleSortInput} name="sort" value={sortState?.sort} >
                <option value="name">Név szerint</option>
                <option value="price">Ár</option>
            </select>
            <select onChange={handleSortInput} name="order" value={sortState?.order} >
                <option value="asc">Növekvő</option>
                <option value="desc">Csökkenő</option>
            </select>
        </div>
    )
}