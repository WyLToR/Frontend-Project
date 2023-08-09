import { Link } from "react-router-dom"
export default function Footer() {
    return (
        <footer>
            <div className="footer-elements">
                <div className="footerlinks payment-information">
                    <Link to={""}>Fizetési és Szállítási információk</Link>
                </div>
                <div className="footerlinks aszf">
                    <Link to={""}>ÁSZF</Link>
                </div>
                <div className="footerlinks data-handling">
                    <Link to={""}>Adatkezelés</Link>
                </div>
                <div className="footerlinks data-transfer">
                    <Link to={""}>Adattovábbítási nyilatkozat</Link>
                </div>
                <div className="footerlinks career">
                    <Link to={""}>Karrier</Link>
                </div>
                <div className="footerlinks cookie-notice">
                    <Link to={""}>Süti tájékoztató</Link>
                </div>
                <div className="footerlinks waste-management">
                    <Link to={""}>Hulladékkezelés</Link>
                </div>
                <div className="customer-service">
                    <span>Ügyfélszolgálat</span>
                </div>
                <div className="footer-phone-number">
                    <span>(06 1) 333 6666</span>
                </div>
                <div className="footer-email">
                    <span>info@webshop.hu</span>
                </div>
                <div className="footer-seprator-1"></div>
                <div className="footer-seprator-2"></div>
                <div className="footer-seprator-3"></div>
                <div className="footer-seprator-4"></div>
                <div className="footer-seprator-5"></div>
                <div className="footer-seprator-6"></div>
            </div>
        </footer>
    )
}