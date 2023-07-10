const express=require('express')
const RestaurantModel = require('../models/restaurant.model')

const restaurantrouter=express.Router()

restaurantrouter.post("/post",async (req,res)=>{
    try {
        const newRestaurant=new RestaurantModel(req.body)
        await newRestaurant.save()
        return res.status(201).send({msg:"New Restauarant added"})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})
restaurantrouter.get("/restaurants",async (req,res)=>{
    try {
        const allRestaurants=await RestaurantModel.find()
        return res.status(200).send(allRestaurants)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

restaurantrouter.get("/restaurants/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const restaurant=await RestaurantModel.findOne({_id:id})
        return res.status(200).send(restaurant)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

restaurantrouter.get("/restaurants/:id/menu",async (req,res)=>{
    try {
        const {id}=req.params
        const restaurant=await RestaurantModel.findOne({_id:id})
        return res.status(200).send(restaurant.menu)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

restaurantrouter.patch("/restaurants/:id/menu",async (req,res)=>{
    try {
        const {id}=req.params
        const Updatedmenu=await RestaurantModel.findByIdAndUpdate({_id:id},{$push:{menu:req.body}})
        return res.status(201).send({msg:"Menu Updated"})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

module.exports=restaurantrouter