

export default function cartFormatter(data) {

    let result = [];

    if (data === null || data === undefined) return
    
    Object.entries(data).forEach(rawData => {
      
        if (!result.some(cartItem => cartItem.id === rawData[1].id)) {
            result.push(
                {
                    ...rawData[1],
                    cartId: rawData[0],
                    amount: 1,
                    
                }
            )
        } else {
            result[result.findIndex(cartItem => cartItem.id === rawData[1].id)].amount += 1
            result[result.findIndex(cartItem => cartItem.id === rawData[1].id)].price =Number((Number(result[result.findIndex(cartItem => cartItem.id === rawData[1].id)].price) + Number(rawData[1].price)).toFixed(2))
        }
        
    })
    return result
}

