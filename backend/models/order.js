const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        contry: {
            type: String,
            default: "pakistan"
        },

        state: {
            type: String,
            required: true
        },

        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },

    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: ObjectId,
                ref: 'Product'
            },

        }
    ],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },

    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
    },
    paidAt: {
        type: Date,
        required: true
    },
    item: {
        type: Number,
        required: true,
        default: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingCharges: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["processing,not procesed yet, complete, pending, canceled"],
        default: 'complete'
    },
    deliverdAt: Date,

}, { timestamps: true })


module.exports = mongoose.model("Order", orderSchema)