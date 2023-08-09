export default function validateForm(formData) {
    if (/^\d+$/.test(formData.title) || formData.title.length < 2) {
        alert("Érvénytelen terméknév");
        return false;
    }

    if (!formData.price || isNaN(formData.price)) {
        alert("Érvénytelen ár");
        return false;
    }
    return true;
}