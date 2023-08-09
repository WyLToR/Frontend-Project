import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { searchMaxValue, searchMinValue } from "../utils/sortUtil";
import "./PriceFilter.css"
import Button from 'react-bootstrap/Button';

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
            <div className="price-filter-input">
                <input type="number"
                    max={value.max}
                    value={value.min}
                    onChange={(e) => {
                        setValue({ ...value, min: Number(e.target.value) })
                    }}
                    step={10} />
                <span>-TÓL</span>

            </div>
            <div className="price-filter-input">
                <input type="number"
                    max={value.max}
                    value={value.max}
                    onChange={(e) => {
                        setValue({ ...value, max: Number(e.target.value) })
                    }} step={10} />
                <span>-IG</span>
            </div>
            <Button variant="primary" onClick={handleFilter}>Szűrés</Button>
        </div>
    )
}