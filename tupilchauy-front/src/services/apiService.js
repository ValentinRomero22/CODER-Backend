export const getProducts = () => {
    const requestInit = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    return new Promise((resolve, reject) => {
        const getProductsFetch = fetch("http://localhost:8080/product/", requestInit)
            .then(response => {
                resolve(getProductsFetch)
            })
            .catch(error => {
                reject(error)
            })
    })
}