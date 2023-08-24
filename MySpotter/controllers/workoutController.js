const { Workout } = require('../models');

module.exports = {
  getAllWorkouts: async (req, res) => {
    try {
      // assuming the user ID is stored in the session as 'userId'
      const userId = req.session.userId;
      const workouts = await Workout.findAll({ where: { userId } });
      console.log(workouts)
      res.render('workouts', { workouts }); 
    } catch (err) {
      res.status(500).json(err);
      
    }
    
  },
  getWorkoutById: async (req, res) => {
    try {
      const workout = await Workout.findByPk(req.params.id);
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json(workout);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createWorkout: async (req, res) => {
    try {
      // assuming the user ID is stored in the session as 'userId'
      const newWorkout = await Workout.create({ ...req.body, userId: req.session.userId });
      const username = req.session.user.username;

      res.status(201).json({
        ...newWorkout.toJSON(),
        username: username,
      });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  updateWorkout: async (req, res) => {
    try {
      const result = await Workout.update(req.body, { where: { id: req.params.id } });
      if (result[0] === 0) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json({ message: 'Workout updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteWorkout: async (req, res) => {
    try {
      const result = await Workout.destroy({ where: { id: req.params.id } });
      if (result === 0) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json({ message: 'Workout deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
