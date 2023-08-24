function editWorkout(workoutId) {
    window.location.href = `/edit-workout/${workoutId}`;
}

async function deleteWorkout(workoutId) {
    const response = await fetch(`/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        // Redirect to the updated workouts page (update the URL if needed)
        window.location.href = '/workouts';
    } else {
        alert('Failed to delete workout');
    }
}

