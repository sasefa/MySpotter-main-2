const User = require('./User');
const Workout = require('./Workout');
const Exercise = require('./Exercise');

// Association: A user can have multiple workouts
User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Association: A workout belongs to a user
Workout.belongsTo(User, {
  foreignKey: 'user_id',
});

// Association: A workout can have multiple exercises
Workout.hasMany(Exercise, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE',
});

// Association: An exercise belongs to a workout
Exercise.belongsTo(Workout, {
  foreignKey: 'workout_id',
});

module.exports = { User, Workout, Exercise };
