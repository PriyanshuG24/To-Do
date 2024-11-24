require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const workOutRoutes=require('./routes/workouts')
const userRoutes=require('./routes/user')

//express app
const app=express()


//middleware

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes

app.use('/api/workouts',workOutRoutes)
app.use('/api/users',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    //listen the request
    app.listen(process.env.PORT,()=>{
        console.log("connect to db listeneing on port ",process.env.PORT)
    })
   }).catch((error)=>{
    console.log(error)
   })

// //listen the request
// app.listen(process.env.PORT,()=>{
//     console.log("listeneing on port ",process.env.PORT)
// })