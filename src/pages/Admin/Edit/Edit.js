import "./Edit.css"
import ProductForm from "../../../components/ProductForm";

export default function Edit() {
    return (
        <div className="edit-product">
            <ProductForm action={"edit"} />
        </div>
    )
}