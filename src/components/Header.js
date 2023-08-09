import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import SearchBar from "./SearchBar";
import CartIcon from "./Cart/cartIcon";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { saveToLocalStorage } from "../services/localStorageHandler";
import "./Header.css";
import { cartContext } from "../contexts/CartContext";
import logo from "../assets/images/logo.png";

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const { setCart } = useContext(cartContext);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    saveToLocalStorage(null);
    setAuth({});
    setCart([]);
    navigate("/");
  };

  return (
    <header>
      <Navbar expand="lg" className="header-nav d-flex justify-content-between">
        <Navbar.Brand>
          <img className="logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBar />
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Főoldal
            </Nav.Link>
            <Nav.Link as={Link} to="/termekek/?page=1">
              Termékek
            </Nav.Link>
            <NavDropdown title="Felhasználó" id="basic-nav-dropdown">
              {auth.firstName ? (
                <>
                  <NavDropdown.Item>
                    Üdv {auth.firstName}!
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`/felhasznalo/${auth.id}`}>
                    Beállítások
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <button className="logout" onClick={logout}>
                      Kijelentkezés
                    </button>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/regisztracio">
                    Regisztráció
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/belepes">
                    Bejelentkezés
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>
              <CartIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
