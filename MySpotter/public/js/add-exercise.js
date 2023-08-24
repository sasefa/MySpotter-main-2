document.addEventListener("DOMContentLoaded", function() {
    var createExerciseModal = new bootstrap.Modal(document.getElementById("createExerciseModal"));

    async function newFormHandler(event) {
        event.preventDefault();

        const exercise_name = document.querySelector('#exercise-name').value;
        const weight = document.querySelector('#weight').value;
        const exercise_sets = document.querySelector('#sets').value;
        const exercise_reps = document.querySelector('#reps').value;
        const workoutId = location.pathname.split('/')[2];

        const response = await fetch(`/api/workouts/${workoutId}/exercises`, {
            method: 'POST',
            body: JSON.stringify({
                name: exercise_name,
                weight: weight,
                sets: exercise_sets,
                reps: exercise_reps,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            createExerciseModal.hide();

            const exercisesContainer = document.querySelector('.row.justify-content-center');
            const newExercise = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm rounded">
                        <div class="card-body text-center">
                            <p>Exercise Name: ${data.name}</p>
                            <p>Weight Used: ${data.weight}</p>
                            <p>Sets: ${data.sets}</p>
                            <p>Reps: ${data.reps}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button class="btn btn-outline-secondary btn-sm" onclick="openEditModal(this)" data-id="${data.id}" data-name="${data.name}" data-weight="${data.weight}" data-sets="${data.sets}" data-reps="${data.reps}">Edit</button>
                            <button type="button" class="btn btn-outline-danger" onclick="deleteExercise(${data.id})">
                                <i class="fa fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
            exercisesContainer.insertAdjacentHTML('beforeend', newExercise);

        } else {
            alert('Failed to add exercise');
        }
    }

    async function deleteExercise(exerciseId) {
        const response = await fetch(`/api/exercises/${exerciseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const exerciseElements = document.querySelectorAll('.col-md-4');
            exerciseElements.forEach(element => {
                if (element.querySelector(`button[onclick="deleteExercise(${exerciseId})"]`)) {
                    element.remove();
                }
            });
        } else {
            alert('Failed to delete exercise');
        }
    }

    window.deleteExercise = deleteExercise;

    const exerciseForm = document.querySelector('.new-exercise-form');
    if (exerciseForm) {
        exerciseForm.addEventListener('submit', newFormHandler);
    }
});
