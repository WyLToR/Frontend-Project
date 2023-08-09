import paginationNumbers from "./paginationNumbers"
function productsToBeDisplayed(products, productPerPage, currentPage) {
    if (products === undefined) return []
    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
    const numberOfPages = Math.ceil(products.length / productPerPage)
    const arrayNumbersOfPages = paginationNumbers(numberOfPages)

    return ({ currentProducts, numberOfPages, arrayNumbersOfPages })
}

export default productsToBeDisplayed