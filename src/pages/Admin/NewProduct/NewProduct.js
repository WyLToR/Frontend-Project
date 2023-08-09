import "./NewProduct.css"
import ProductForm from "../../../components/ProductForm"

export default function NewProduct() {
    return (
        <div className="new-product">
            <ProductForm action={"create"} />
        </div>
    )
}