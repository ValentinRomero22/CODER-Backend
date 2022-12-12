class ProductDao {
    getNext_Id(products) {
        let lg = products.length
        return lg
            ? parseInt(products[lg - 1]._id) + 1
            : 1
    }
    
    getIndex(_id, products) {
        return products.findIndex((product) => product._id == _id)
    }
}

module.exports = ProductDao