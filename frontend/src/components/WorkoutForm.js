import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = ({ workoutToEdit, setWorkoutToEdit }) => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthContext();

    // If we are editing a workout, populate the fields with existing data
    useEffect(() => {
        if (workoutToEdit) {
            setTitle(workoutToEdit.title);
            setLoad(workoutToEdit.load);
            setReps(workoutToEdit.reps);
        }
    }, [workoutToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const workout = { title, load, reps };
        const response = workoutToEdit
            ? await fetch(`/api/workouts/${workoutToEdit._id}`, {
                  method: "PUT",
                  body: JSON.stringify(workout),
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`,
                  },
              })
            : await fetch("/api/workouts", {
                  method: "POST",
                  body: JSON.stringify(workout),
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`,
                  },
              });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            if (workoutToEdit) {
                dispatch({
                    type: "UPDATE_WORKOUT",
                    payload: json,
                });
                setWorkoutToEdit(null); // Reset the edit mode
            } else {
                dispatch({
                    type: "CREATE_WORKOUT",
                    payload: json,
                });
            }
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>{workoutToEdit ? "Edit Workout" : "Add a New Workout"}</h3>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Description:</label>
            <textarea
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Priority:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />
            <button>{workoutToEdit ? "Update" : "Add"}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
