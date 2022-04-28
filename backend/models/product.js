const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name Is required"],
        maxlength: [40, "Name Should have max 20 chars"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description Is required"],
        maxlength: [400, "Name Should have max 20 chars"]
    },
    price: {
        type: Number,
        required: [true, "price Is required"],
        maxlength: [8, "Name Should have max 20 chars"]
    },
    ratings: {
        type: Number,
        required: [true, "price Is required"],
        default: 0
    },
    images: {
        type: Array
    },
    category: {
        type: String,
        required: [true, "Enter the product category"],
        trim: true
    },
    stock: {
        type: Number,
        maxlength: [4, "stock Should have max 4 chars"],
        default: 1

    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }



}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)