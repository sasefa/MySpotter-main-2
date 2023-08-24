const express = require('express');
const router = express.Router();
const { Exercise } = require('../models'); 
router.get('/workouts', async (req, res)=> {
  res.render('workouts')
});


router.get('/exercises', async (req, res)=> {
  res.render('exercises')
});
router.get('/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).render('not-found', { message: 'Exercise not found' });
    }
    res.render('exercise', { exercise }); 
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.delete('/api/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.destroy({ where: { id: req.params.id } });
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/api/exercises/:exerciseId', async (req, res) => {
  try {
      const exerciseId = req.params.exerciseId;
      const { name, weight, sets, reps } = req.body;

      const exercise = await Exercise.findByPk(exerciseId);
      if (!exercise) {
          return res.status(404).json({ error: 'Exercise not found' });
      }

      exercise.name = name;
      exercise.weight = weight;
      exercise.sets = sets;
      exercise.reps = reps;

      await exercise.save();

      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
  }
});



router.get('/', (req, res) => {
    if (req.session.user) {
        const username = req.session.user.username;
        res.render('index', { username }); 
    } else {
        res.render('home');
    }
});

router.get('/index', (req, res) => {
      res.render('index');
  });

router.get('/login', (req, res) => {
  res.render('login'); 
});

router.get('/signup', (req, res) => {
  res.render('signup'); 
});
const { Workout } = require('../models');

router.get('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id, {
      include: Exercise, // Include the associated exercises in the workout data
    });
    if (!workout) {
      return res.status(404).render('not-found', { message: 'Workout not found' });
    }
    res.render('workout', { workout });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});



module.exports = router;
