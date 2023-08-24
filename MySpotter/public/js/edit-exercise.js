document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".edit-exercise-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const exerciseId = document.getElementById("edit-exercise-id").value;
        const name = document.getElementById("edit-exercise-name").value;
        const weight = document.getElementById("edit-exercise-weight").value;
        const sets = document.getElementById("edit-exercise-sets").value;
        const reps = document.getElementById("edit-exercise-reps").value;

        fetch(`/api/exercises/${exerciseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, weight, sets, reps }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Locate the exercise element and update its content
                const exerciseElement = document.querySelector(`button[data-id="${exerciseId}"]`).closest('.col-md-4');
                exerciseElement.querySelector('.card-body p:nth-child(1)').innerText = `Exercise Name: ${name}`;
                exerciseElement.querySelector('.card-body p:nth-child(2)').innerText = `Weight Used: ${weight}`;
                exerciseElement.querySelector('.card-body p:nth-child(3)').innerText = `Sets: ${sets}`;
                exerciseElement.querySelector('.card-body p:nth-child(4)').innerText = `Reps: ${reps}`;

                // Close the modal
                var editModal = document.getElementById('editExerciseModal');
            var bsModal = new bootstrap.Modal(editModal);
            bsModal.hide();

            } else {
                alert('Error updating exercise.');
            }
        })
        .catch(error => console.error('There was an error updating the exercise:', error));
    });
});
