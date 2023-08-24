async function editFormHandler(event) {
    event.preventDefault();

    const workout_name = document.querySelector('#workout-name').value;
    const workout_description = document.querySelector('#workout-description').value;
    const workout_exercises = document.querySelector('#workout-exercises').value;
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const sets = document.querySelector('#sets').value;
    const reps = document.querySelector('#reps').value;

    const response = await fetch(`/api/dish/${id}`, {
        method: 'PUT', 
        body: JSON.stringify({
        workout_name,
        workout_description,
        workout_exercises,
        name,
        description,
        sets,
        reps
    }),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace(`/workout/${id}`);
    } else {
     alert('Failed to edit workout');
    }
}

document
  .querySelector('.edit-workout-form')
  .addEventListener('submit', editFormHandler);
