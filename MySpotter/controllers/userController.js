const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const result = await User.update(req.body, { where: { id: req.params.id } });
      if (result[0] === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await User.destroy({ where: { id: req.params.id } });
      if (result === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
      req.session.user = user; 
      res.redirect('/index'); 
    } catch (err) {
      res.status(500).json(err);
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: 'Logged out successfully' });
    });
  },
  createUser: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      const newUser = await User.create({ ...req.body, password: hashedPassword });
      req.session.user = newUser; 
      res.redirect('/index'); 
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
