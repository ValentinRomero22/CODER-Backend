/* export const getProducts = (id) =>{
    if(id == 0){
        return new Promise((resolve, reject) =>{
            fetch('http://localhost:8080/api/products')
            .then(res =>{
                resolve(res)
            })
            .catch(error =>{
                reject(error)
            })  
        })
    } else{
        return new Promise((resolve, reject) =>{
            fetch('http://localhost:8080/api/products/' + id)
            .then(res =>{
                resolve(res)
            }).catch(error =>{
                reject(error)
            })
        })
    }
} */

/* export const deleteProduct = (id) =>{
    const requestInit = { method: 'DELETE' }
    return new Promise((resolve, reject) =>{
        fetch('http://localhost:8080/api/products/' + id, requestInit)
        .then(res =>{
            resolve(res)
        }).catch(error =>{
            reject(error)
        })
    })
} */

export const getProducts = (id) =>{
    if(id == 0){
        fetch('http://localhost:8080/api/products')
        .then(res =>{
            return res
        })
        .catch(error =>{
            return error
        })  
    } else{
        fetch('http://localhost:8080/api/products/' + id)
        .then(res =>{
            return res
        }).catch(error =>{
            return error
        })
    }
}

export const deleteProduct = (id) =>{
    const requestInit = { method: 'DELETE' }
    fetch('http://localhost:8080/api/products/' + id, requestInit)
    .then(res =>{
        return res
    }).catch(error =>{
        return error
    })
}