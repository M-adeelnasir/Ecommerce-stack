const Product = require('../models/product');
const Order = require('../models/order');


exports.createOrder = async (req, res) => {
    const { shippingInfo, orderItems, paymentInfo, items, taxPrice, shippingCharges, totalPrice, orderStatus } = req.body;

    const postedBy = req.user.id

    try {

        const order = await Order.create({
            shippingInfo, orderItems, paymentInfo, items, taxPrice, shippingCharges, totalPrice, orderStatus, postedBy
        })

        res.status(201).json({
            success: true,
            data: order
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error"
        })
    }

}

//get single order

exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const order = await Order.findById({ _id: orderId }).populate('postedBy')
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "invalid order id"
            })
        }

        res.json({
            success: true,
            data: order
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error"
        })
    }
}

//get logged in users orders

exports.getOrders = async (req, res) => {
    try {

        const userId = req.user.id

        const orders = await Order.find({ postedBy: userId })

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "No orders founded"
            })
        }
        res.json({
            success: true,
            data: orders
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error"
        })
    }
}

//admin
//get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("postedBy")

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "No orders founded"
            })
        }

        let total = 0;
        orders.forEach(order => {
            total += order.totalPrice
        })
        res.json({
            success: true,
            data: orders,
            totalOrderAmount: total
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error"
        })
    }

}


//admin
//update order status
exports.updateOrderStatus = async (req, res) => {

    try {
        const { productId, orderStatus } = req.body;

        let order = await Order.findById(productId)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No orders founded"
            })
        }
        if (order.orderStatus === "Deliverd") {
            return res.status(400).json({
                message: "your already deliverd this order"
            })
        } else {
            order.updateOne({ orderStatus: orderStatus }, async (err, success) => {
                if (err) {
                    console.log(err);
                    return

                }
                order.orderItems.forEach(async (order) => {
                    await updateStock(order.product, order.quantity)
                })

                if (orderStatus === "Deliverd") {

                    order.deliverdAt = Date.now()
                }



                await order.save({ validateBeforeSave: false })

                res.json({
                    success: true,
                    order
                })
            })
        }




    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error"
        })
    }
}

async function updateStock(id, quantity) {
    let product = await Product.findById(id)
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}


//delete order
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const order = await Order.findByIdAndDelete(orderId)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No orders founded"
            })
        }
        res.json({
            success: true,
            message: "order deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error"
        })
    }

}