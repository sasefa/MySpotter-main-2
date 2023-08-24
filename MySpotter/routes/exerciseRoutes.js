const router = require('express').Router({ mergeParams: true });
const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exerciseController');

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);


module.exports = router;
