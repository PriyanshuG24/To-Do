import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useState } from 'react';

const WorkoutDetails = ({ workout, setWorkoutToEdit }) => {
    const { user } = useAuthContext();
    const { title, reps, load, createdAt } = workout;
    const { dispatch } = useWorkoutsContext();
    const handleEdit = () => {
        if (setWorkoutToEdit) {
            setWorkoutToEdit(workout); // Set workout to be edited in the parent component (Home)
        }
    };
    const handleClick = async () => {
        if (!user) {
            return;
        }
        
        const response = await fetch('/api/workouts/' + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json });
        }
    };

    return (
        <div className="workout-details">
            <div className="content">
                <h4>{title}</h4>
                <p><strong>Description: </strong>{load}</p>
                <p><strong>Priority: </strong>{reps}</p>
                <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            </div>
            <div className="buttons">
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                {/* Edit button that triggers the onEdit callback */}
                <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
            </div>
        </div>
    );
};

export default WorkoutDetails;
