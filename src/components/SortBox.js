import { useContext } from "react"
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { useSearchParams } from "react-router-dom";
import { Form } from 'react-bootstrap'
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
            <Form>
                <Form.Group>
                    <Form.Control as="select" onChange={handleSortInput} name="sort" value={sortState?.sort}>
                        <option value="name">Név szerint</option>
                        <option value="price">Ár</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="select" onChange={handleSortInput} name="order" value={sortState?.order}>
                        <option value="asc">Növekvő</option>
                        <option value="desc">Csökkenő</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}