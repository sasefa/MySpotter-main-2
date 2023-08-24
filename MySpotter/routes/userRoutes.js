const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.post('/login', login);
router.post('/logout', logout);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
