const router = require('express').Router();
const {
  getAllWorkouts,
  getWorkoutById, 
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.post('/create', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);
const exerciseRoutes = require('./exerciseRoutes');
router.use('/:workout_id/exercises', exerciseRoutes);

module.exports = router;
