const express=require('express')
const UserModel = require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userrouter=express.Router()

userrouter.post("/register",async (req,res)=>{
    try {
        const {name,email,password,address}=req.body
        const isUserPresent=await UserModel.findOne({email})
        if(isUserPresent){
            return res.status(401).send({msg:"user already present"})
        }
        bcrypt.hash(password,5,async (err,hash)=>{
            const newUser=new UserModel({name,email,password:hash,address})
            await newUser.save()
            return res.status(201).send({msg:"Registration Succesful",newUser})
        })
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

userrouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body
        const isUserPresent=await UserModel.findOne({email})
        if(!isUserPresent){
            return res.status(401).send({msg:"No user found"})
        }
        bcrypt.compare(password,isUserPresent.password,async (err,result)=>{
            if(result){
                const token=jwt.sign({userid:isUserPresent._id},"marvel",{expiresIn:"1h"})
                return res.status(201).send({msg:"Login Succesful",token,isUserPresent})
            }else{
                return res.status(401).send({msg:"wrong credentials"})
            }
        })
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

userrouter.patch("/user/:id/reset",async (req,res)=>{
    try {
        const {id}=req.params
        const {currentpass,newpass}=req.body
        const user=await UserModel.findOne({_id:id})
        bcrypt.compare(currentpass,user.password,async (err,result)=>{
            if(result){
                const newhashPassword= bcrypt.hashSync(newpass,5)
                const Updateuserpass=await UserModel.findByIdAndUpdate({_id:id},{password:newhashPassword})
                return res.status(204).send({msg:"password updated"})
            }else{
                return res.status(401).send({msg:"wrong current pass"})
            }
        })
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }

})


module.exports=userrouter