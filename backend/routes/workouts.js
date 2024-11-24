const express = require('express');
const { 
    createWorkout, 
    getWorkouts, 
    getWorkout, 
    deleteWorkout, 
    updateWorkout ,
    deleteAllWorkouts
} = require('../controllers/workoutController');
const requireAuth =require('../middleware/requireAuth')

const router = express.Router();
//require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.put('/:id', updateWorkout);

//DELETE ALL workouts
router.delete('/', deleteAllWorkouts);

module.exports = router;
