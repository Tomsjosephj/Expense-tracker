const express= require('express')

const cors= require('cors')

const Transaction= require('./Models/Transaction')
const  mongoose = require('mongoose')

require('dotenv').config()
const app= express()

app.use(cors())
app.use(express.json())

app.get("/api/test", (req,res)=>{
         
    res.json("Its ok, you are fine")
})


app.listen(4000)


app.post("/api/transaction", async(req,res)=>{
    await mongoose.connect(process.env.mongo_url)

    const {name,description,datetime,price}=req.body

   const transaction =await Transaction.create({
        name,description,datetime,price

    })

    res.json(transaction)

    console.log(transaction);

   // console.log(process.env.mongo_url)
   // res.json(req.body)
})



app.get("/api/transactions", async(req,res)=>{

    await mongoose.connect(process.env.mongo_url)

    const result=await Transaction.find()

    res.json(result)
})

//