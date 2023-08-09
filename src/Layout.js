import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Layout.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrentPageProvider } from "./contexts/CurrentPageContext";
import { ProductPerPageProvider } from "./contexts/ProductPerPageContext";
import { SearchBarProvider } from "./contexts/SearchBarContext";
import { SearchedProductsProvider } from "./contexts/SearchedProductsContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/Toast/ToastContainer";
import { CartContextProvider } from "./contexts/CartContext";

export default function Layout() {

    return (
        <AuthProvider>
            <ProductsProvider>
                <SearchedProductsProvider>
                    <SearchBarProvider>
                        <ProductPerPageProvider>
                            <CurrentPageProvider>
                                <CartContextProvider>
                                    <ToastProvider>
                                        <Header />
                                        <Outlet />
                                        <Footer />
                                        <ToastContainer />
                                    </ToastProvider>
                                </CartContextProvider>
                            </CurrentPageProvider>
                        </ProductPerPageProvider>
                    </SearchBarProvider>
                </SearchedProductsProvider>
            </ProductsProvider>
        </AuthProvider >
    )
}