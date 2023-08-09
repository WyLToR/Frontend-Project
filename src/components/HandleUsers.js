import { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import "./HandleUsers.css"
import CRUD from '../services/CRUD';
import dataFormatter from '../utils/dataFormatter';
import UserInHandle from './UserInHandle';
import PaginationTwo from './PaginationTwo';
import { ProductPerPageContext } from '../contexts/ProductPerPageContext';
import { CurrentPageContext } from '../contexts/CurrentPageContext';
import productsToBeDisplayed from '../utils/currentProducts';
import SearchAdminInput from './SearchAdminInput';

function HandleUsers() {
    const [users, setUsers] = useState([])
    const [searchedUser, setSearchedUsers] = useState([])
    const [url, setURL] = useSearchParams()
    const { productPerPage } = useContext(ProductPerPageContext)
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext)
    const { currentProducts, numberOfPages, arrayNumbersOfPages } = productsToBeDisplayed(searchedUser, productPerPage, currentPage)
    const numberOfPage = Number(url.get("page"))

    useEffect(() => {
        CRUD.read("users").then(data => setUsers(dataFormatter(data)))
        if (numberOfPage != 0 && numberOfPage != 1) {
            setCurrentPage(numberOfPage)
        } else if (numberOfPage == "") {
            setCurrentPage(1)
        } else {
            return
        }
    }, [])

    useEffect(() => {
        setURL(`?page=${currentPage}`)
    }, [currentPage])

    return (
        <>
            <SearchAdminInput datas={users} searchedSetter={setSearchedUsers} filteredKey="email" placeholder="Felhasználó keresése..." />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vezetéknév</th>
                        <th>Keresztnév</th>
                        <th>Felhasználónév</th>
                        <th>E-mail</th>
                        <th>Jogosultság</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((elem, idx) => {
                        return <UserInHandle users={users} setUsers={setUsers} key={elem.id} elem={elem} idx={idx} />
                    })}
                </tbody>
            </Table>
            <PaginationTwo numberOfPages={numberOfPages} arrayNumbersOfPages={arrayNumbersOfPages} />
        </>
    )
}

export default HandleUsers