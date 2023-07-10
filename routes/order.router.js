const express = require('express')
const OrderModel = require('../models/order.model')

const orderrouter = express.Router()


orderrouter.post("/orders", async (req, res) => {
    try {
        const order = new OrderModel(req.body)
        await order.save()
        return res.status(201).send({ msg: "Order Added", order })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

orderrouter.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params
        const allorders = await OrderModel.findOne({ _id: id }).populate("user").populate("restaurant")
        return res.status(200).send(allorders)
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }

})

orderrouter.patch("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const Updateorder = await OrderModel.findByIdAndUpdate({ _id: id }, { status })
        return res.status(201).send({ msg: "Order Updated" })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})


module.exports = orderrouter