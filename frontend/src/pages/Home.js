import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [workoutToEdit, setWorkoutToEdit] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    const handleDeleteAll = async () => {
        if (!user) {
            alert('You must be logged in to delete workouts.');
            return;
        }

        const response = await fetch('/api/workouts', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (response.ok) {
            dispatch({ type: 'SET_WORKOUTS', payload: [] });
        } else {
            const error = await response.json();
            alert(error.error);
        }
    };

    return (
        <>
            <div className="home">
                <div className="workouts">
                    {workouts &&
                        workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout}  setWorkoutToEdit={setWorkoutToEdit}/>
                        ))}
                </div>
                <WorkoutForm workoutToEdit={workoutToEdit} setWorkoutToEdit={setWorkoutToEdit}/>
            </div>
            <div>
                {/* Conditionally render the button only when workouts exist */}
                {workouts && workouts.length > 0 && (
                    <button className="delete-all" onClick={handleDeleteAll}>
                        Delete All Workouts
                    </button>
                )}
            </div>
        </>
    );
};

export default Home;
