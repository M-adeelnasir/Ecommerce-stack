const Product = require('../models/product')
const User = require('../models/user')

//Admin
//create Product
exports.createProduct = async (req, res, next) => {
    try {
        const userId = req.user.id
        // console.log(req.profile);
        console.log(userId);
        req.body.postedBy = userId

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




//add review
exports.addReview = async (req, res) => {

    try {
        const { comment, rating, productId, name } = req.body;

        const postedBy = req.user.id


        const review = {
            comment,
            rating: Number(rating),
            postedBy,
            name
        }

        let product = await Product.findById({ _id: productId })

        const isReviewed = await product.reviews.find(rev => rev.postedBy.toString() === postedBy.toString())

        if (isReviewed) {
            product.reviews.forEach(rev => {
                if (rev.postedBy.toString() === postedBy.toString()) {

                    rev.rating = rating
                    rev.comment = comment
                }
            })


        } else {
            product.reviews.push(review);
            product.numberOfReviews = product.reviews.length
        }

        let total = 0
        product.reviews.forEach(rev => {
            total += rev.rating
        })
        product.ratings = total / product.reviews.length

        console.log(product.ratings);


        const p = await product.save({ validateBeforeSave: false })

        res.json({
            success: true,
            data: p
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        })
    }

}

//get all reviews of a product
exports.getReviews = async (req, res) => {
    try {
        const { productId } = req.body
        console.log(productId);
        const product = await Product.findById({ _id: productId })

        if (!product) {
            return res.statuts(404).json({
                success: false,
                message: "Invalid Product id"
            })
        }
        res.json({
            success: true,
            data: product.reviews,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}


//delete reviews
exports.deletReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.body;

        const product = await Product.findById({ _id: productId })
        if (!product) {
            return res.statuts(404).json({
                success: false,
                message: "Invalid Product id"
            })
        }

        const reviews = await product.reviews.filter((rev) => rev._id.toString() !== reviewId.toString())


        let total = 0
        reviews.forEach(rev => {
            total += rev.rating
        })

        const ratings = total / product.reviews.length;

        const numberOfReviews = reviews.length;
        console.log(numberOfReviews);

        await Product.findByIdAndUpdate({ _id: productId }, { reviews, ratings, numberOfReviews }, { runValidators: true, new: true })

        res.json({
            success: true,
            message: "Review deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error"
        })

    }

}