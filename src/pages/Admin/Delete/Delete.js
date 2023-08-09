import "./Delete.css"
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../../firebaseConfig"
import { connectStorageEmulator, deleteObject, getStorage, ref } from "firebase/storage";
import CRUD from "../../../services/CRUD";
import { useContext, useEffect, useState } from "react";
import ToastContext from "../../../contexts/ToastContext";

export default function Delete() {
    const { setToasts } = useContext(ToastContext);
    const [imgPath, setImgPath] = useState("")
    const [productToDelete, setProductToDelete] = useState("");
    const storage = getStorage(app);
    const image = ref(storage, imgPath)
    const { productid } = useParams();
    const { userid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (productid) {
            CRUD.read("products", productid)
                .then(data => {
                    setProductToDelete(data.title);
                    setImgPath(data.imagePath);
                }).catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
        }
    }, [productid])
    useEffect(() => {
        if (userid) {
            CRUD.read("users", userid)
                .then(data => {
                    setProductToDelete(data.username);
                }).catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
        }
    }, [userid])

    const deleteProduct = () => {
        if (productid) {
            CRUD.delete("products", productid)
                .then(data => {
                    if (data === null) setToasts((toasts) => [...toasts, "Sikeres törlés!"]);
                    navigate("/admin/termekek");
                })
                .catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
            deleteObject(image).then(res => console.log("sikeres törlés!"))
        }
        if (userid) {
            CRUD.delete("users", userid)
                .then(data => {
                    if (data === null) setToasts((toasts) => [...toasts, "Sikeres törlés!"]);
                    navigate("/admin/userek-kezelese");
                })
                .catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
        }
    }
    console.log("imgpath", imgPath)
    return (
        <div className="delete-product">
            <h2>Biztosan törlöd a(z) <i>{productToDelete}</i> {productid ? "terméket?" : "felhasználót?"}</h2>
            <button className="delete-btn" onClick={deleteProduct}>Törlés</button>
            <button className="cancel-btn" onClick={() => navigate("/admin/termekek")}>Mégse</button>
        </div>
    )
}