const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
    items: Array,
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const OrderModel = mongoose.model("order", orderSchema)

module.exports=OrderModel