require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Allows us to read JSON data from the frontend

// TP Step 4: Connect to MongoDB [cite: 56]
// We use the environment variable for Docker, but provide a fallback just in case
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/examdb';
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Simple User Model so our routes have something to work with
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', UserSchema);

// TP Step 5: Routes [cite: 57]

// a. Lister tous les utilisateurs [cite: 58]
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// b. Lister les détails d'un utilisateur [cite: 59]
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// c. Ajouter un utilisateur [cite: 60]
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

// d. Supprimer un utilisateur [cite: 61]
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

// TP Step 3: Use port 3010 [cite: 55]
const port = 3010;
app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});