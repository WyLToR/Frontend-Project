function paginationNumbers(numberOfPages) {
    let result = [];
    for (let number = 1; number <= numberOfPages; number++) {
        result.push(number)
    }
    return result
}

export default paginationNumbers