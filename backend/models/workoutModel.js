const mongoose=require('mongoose')
const Schema=mongoose.Schema

const workoutScheme=new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Workout',workoutScheme)