import "./ProductForm.css"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebaseConfig"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import Button from 'react-bootstrap/Button';
import CRUD from "../services/CRUD";
import DynamicInput from "./DynamicInput";
import validateForm from "../utils/validateForm";
import ToastContext from "../contexts/ToastContext";

export default function ProductForm({ action }) {
    const { setToasts } = useContext(ToastContext)
    const { productid } = useParams();
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [imgFile, setImgFile] = useState([])
    const [fullPath, setFullPath] = useState("")
    const [imgIsUpload, setImgIsUpload] = useState(false)
    const storage = getStorage(app)
    const [fileRef, setFileRef] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: ""
    })

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            category: categories,
        }));
    }, [categories])

    useEffect(() => {
        if (fullPath) setImgIsUpload(true)
    }, [fullPath])

    useEffect(() => {
        if (imgFile) {
            setFileRef(ref(storage, `product-images/${imgFile.name}`))
        } else {
            setFileRef("")
        }
    }, [imgFile])

    useEffect(() => {
        if (productid) {
            CRUD.read("products", productid)
                .then(data => {
                    setFormData({
                        title: data.title,
                        price: data.price,
                        imageUrl: data.imageUrl,
                        description: data.description
                    });
                    setCategories(data.category)
                }).catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
        }
    }, [productid])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };
    const handleImgInputChange = (e) => {
        setImgFile(e.target.files[0])
    };
    const uploadImg = () => {
        if (!fileRef) return
        uploadBytes(fileRef, imgFile).then(uploadData => {
            if (uploadData.ref) {
                getDownloadURL(uploadData.ref).then(url => {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        imageUrl: url,
                        imagePath: uploadData.metadata.fullPath
                    }))
                    setFullPath(uploadData.metadata.fullPath)
                    setToasts((toasts) => [...toasts, "Sikeres feltöltés!"]);
                })
            } else {
                setToasts((toasts) => [...toasts, `Sikertelen feltöltés!`]);
            }
        })
    };

    const deleteImg = () => {
        deleteObject(fileRef).then(res => {
            console.log("sikeres törlés!")
            setImgIsUpload(false)
            setFullPath("")
            setFormData((prevFormData) => ({
                ...prevFormData,
                imageUrl: "",
                imagePath: ""
            }))
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(formData)) return;
        if (action === "create") {
            CRUD.create("products", formData)
                .then(data => {
                    setToasts((toasts) => [...toasts, "Sikeresen létrehozva!"]);
                    navigate("/admin/termekek");
                })
                .catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
        } else if (action === "edit") {
            CRUD.update({ ...formData, id: productid })
                .then(data => {
                    setToasts((toasts) => [...toasts, "Sikeresen szerkesztve!"]);
                    navigate("/admin/termekek");
                })
                .catch(error => {
                    setToasts((toasts) => [...toasts, `Hiba: ${error.message}`]);
                })
        }
    };

    return (
        <form className="product-form" onSubmit={handleFormSubmit}>
            <label htmlFor="title">Termék neve</label>
            <input id="title" type="text" onChange={handleInputChange} value={formData?.title} />

            <label htmlFor="description">Termék leírása</label>
            <input id="description" type="text" onChange={handleInputChange} value={formData?.description} />

            <label htmlFor="price">Termék ára</label>
            <input id="price" type="text" onChange={handleInputChange} value={formData?.price} />

            <label htmlFor="category">Kategóriák</label>
            <DynamicInput categories={categories} setCategories={setCategories} />

            <label htmlFor="imageUrl">Termékkép</label>
            <div className="img-upload-container">
                {imgIsUpload ? <input id="imageUrl" type="file" onChange={handleImgInputChange} disabled /> : <input id="imageUrl" type="file" onChange={handleImgInputChange} />}
                {imgIsUpload ? <Button variant="outline-primary" onClick={uploadImg} disabled>Feltölt</Button> : <Button variant="outline-primary" onClick={uploadImg}>Feltölt</Button>}
                {imgIsUpload && <Button variant="outline-danger" onClick={deleteImg}>Mégse</Button>}
            </div>
            <div className="img-prev-container">
                {formData.imageUrl ? <img alt="kép" src={formData.imageUrl} /> : ""}
            </div>

            <button className="submit"></button>
            <button className="cancel" onClick={() => navigate("/admin/termekek")}>Mégse</button>
        </form>
    )
}