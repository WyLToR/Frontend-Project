import Pagination from 'react-bootstrap/Pagination';
import "./Pagination.css"
import { useContext } from 'react';
import { CurrentPageContext } from '../contexts/CurrentPageContext';
function PaginationTwo({ numberOfPages, arrayNumbersOfPages }) {
    const { currentPage, setCurrentPage } = useContext(CurrentPageContext)
    if (numberOfPages == 1 || numberOfPages == 0) {
        return
    } else {
        function forward() {
            if (currentPage < numberOfPages) setCurrentPage(prevState => prevState + 1)
        }
        function backward() {
            if (currentPage > 1) setCurrentPage(prevState => prevState - 1)
        }

        return (
            <div className='pagination-container'>
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} />
                    <Pagination.Prev onClick={backward} />
                    {arrayNumbersOfPages.map(navNumbers => {
                        return (
                            <Pagination.Item onClick={() => setCurrentPage(navNumbers)} active={currentPage == navNumbers ? true : false} key={navNumbers}>
                                {navNumbers}
                            </Pagination.Item>)
                    })}
                    <Pagination.Next onClick={forward} />
                    <Pagination.Last onClick={() => setCurrentPage(numberOfPages)} />
                </Pagination>
            </div>
        )
    }
}


export default PaginationTwo