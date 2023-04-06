import User from '../models/userModel.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;
    const user = new User({
      name,
      email,
      password,
      dateOfBirth
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch users' });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch user' });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not update user' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user' });
  }
};