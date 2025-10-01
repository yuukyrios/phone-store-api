const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users - Get All Users, tanpa password, field tetap ada meski null
router.get('/', async (req, res) => {
  try {
    let users = await User.findAll();
    users = users.map(user => ({
      id: user.id,
      name: user.name,
      address: user.address || null,
      phone_number: user.phone_number || null,
      age: user.age || null
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /users/:id - Get User by ID tanpa password, hanya field tertentu
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      name: user.name,
      address: user.address || null,
      phone_number: user.phone_number || null,
      age: user.age || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /users - Add User, terima password tapi tidak dikembalikan
router.post('/', async (req, res) => {
  try {
    const { name, address, phone_number, age, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required' });
    }

    const newUser = await User.create({ name, address, phone_number, age, password });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      address: newUser.address || null,
      phone_number: newUser.phone_number || null,
      age: newUser.age || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
