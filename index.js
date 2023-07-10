const express=require('express')
const connection = require('./connection/db')
const userrouter = require('./routes/user.router')
const restaurantrouter = require('./routes/restaurant.router')
const orderrouter = require('./routes/order.router')


const app=express()
app.use(express.json())

app.use("/api",userrouter)
app.use("/api",restaurantrouter)
app.use("/api",orderrouter)
app.listen(4031,async ()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
       console.log(error) 
    }
    console.log("connected to server")
})