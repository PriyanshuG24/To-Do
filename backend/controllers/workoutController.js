const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')

//get all workouts
const getWorkouts=async (req,res)=>{
    const  user_id=req.user._id
    const workouts=await Workout.find({user_id}).sort({createdAt:-1})
    return res.status(200).json(workouts)
}

//get a single workout

const getWorkout=async (req,res)=>{
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such workout"})
    }
    const workout=await Workout.findById(id)
    if(!workout){
       return  res.status(400).json({error:"No such workout"})
    }
    else{
        return res.status(200).json(workout)
    }
}

//create a workout
const createWorkout= async (req,res)=>{
    const {title,load,reps}=req.body

    let emptyFields=[]
    if(!title) emptyFields.push('title')
    if(!load) emptyFields.push('load')
    if(!reps) emptyFields.push('reps')
    if(emptyFields.length>0){
        return res.status(400).json({error:"Please fill in all required field",emptyFields})
    }
    try{
        const user_id=req.user._id
        const workout=await Workout.create({title,load,reps,user_id})
        return res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a workout

const deleteWorkout=async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such workout"})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error:"No such workout"})
    }
     res.status(200).json(workout)
}


//update a workout
const updateWorkout=async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"No such workout"})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    },{new:true})
    if(!workout){
        return res.status(400).json({error:"No such workout"})
    }
     res.status(200).json(workout)

}

// Delete all workouts
const deleteAllWorkouts = async (req, res) => {
    const user_id = req.user._id;

    try {
        const result = await Workout.deleteMany({ user_id });
        if (result.deletedCount === 0) {
            return res.status(400).json({ error: 'No workouts to delete' });
        }
        res.status(200).json({ message: 'All workouts deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    deleteAllWorkouts
}