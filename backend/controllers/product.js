const Product = require('../models/product')


//Admin
//create Product
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            data: product
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: true,
            data: "Product Create Failed"
        })
    }
}


//Admin
//get All Products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json({
            success: true,
            data: products
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: {}
        })
    }
}


//admin
// getSingleRoute
exports.getProduct = async (req, res, next) => {

    try {
        const product = await Product.findById({ _id: req.params.id })
        if (!product) {
            return res.statuts(404).json({
                success: false,
            })
        }
        res.json({
            success: true,
            data: product
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: "Get Single product Failed"
        })
    }
}

//admin
// Update Product
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById({ _id: req.params.id })
        if (!product) {
            return res.statuts(404).json({
                success: false,
            })
        }

        product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        res.json({
            success: true,
            data: product
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: "Get Single product Failed"
        })
    }

}


//admin
//Delete
exports.deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndRemove({ _id: req.params.id })
        if (!product) {
            return res.statuts(404).json({
                success: false,
            })
        }
        res.json({
            success: true,
            data: {}
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: "Delete product Failed"
        })
    }


}