import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./AdminLayoutRes.css"
import "./AdminLayout.css"
export default function AdminLayout() {
    return (

        <>
            <Navbar bg="dark" variant="dark">
                <Container className="admin-navs-cont">
                    <Nav className="me-auto">
                        <Nav.Link>
                            {' '}
                            <Link className="admin-linkitem" to="termekek/?page=1">Lista nézet</Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="admin-linkitem" to="termek-felvitel">Termék felvitel</Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="admin-linkitem" to="rendelesek/?page=1">Rendelések</Link>
                        </Nav.Link>
                        <Nav.Link>
                            {' '}
                            <Link className="admin-linkitem" to="userek-kezelese/?page=1">Felhasználók kezelése</Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}