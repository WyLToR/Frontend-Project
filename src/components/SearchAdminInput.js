import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
function SearchAdminInput({ datas, searchedSetter, filteredKey, placeholder }) {
    const [search, setSearch] = useState("")

    useEffect(() => {
        searchedSetter(datas)
    }, [datas])

    useEffect(() => {
        if (!search) {
            searchedSetter(datas)
        }
    }, [search])
    function userSearchHandler() {
        if (search) {
            searchedSetter(datas.filter(data => {
                if (data[filteredKey].toLowerCase().includes(search)) return data
                if (data[filteredKey].includes(search)) return data
            }))
        }
    }

    function userSearchInputHandler(e) {
        if (e.key === "Enter") {
            userSearchHandler()
        }
    }

    return (
        <InputGroup className="mb-3 user-search-container">
            <Form.Control
                placeholder={placeholder}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={userSearchInputHandler}
            />
            <Button onClick={userSearchHandler} variant="outline-secondary" id="button-addon2">
                Keresés
            </Button>
        </InputGroup>
    )
}

export default SearchAdminInput