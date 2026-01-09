const express = require('express');
const Password = require('./models/password');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
// const auth = require('./middlewares/auth'); // removed for now

const cors = require("cors");
const app = express();
app.use(express.json()); // JSON body parse karega
app.use(cors());

const port = 5000;

// ---------------------- Password Routes ----------------------

// GET all passwords
app.get("/api/passwords", async (req, res) => {
    try {
        const passwords = await Password.find();
        res.json(passwords);
    } catch (err) {
        console.error("Error fetching passwords:", err);
        res.status(500).json({ message: "Failed to fetch passwords" });
    }
});

// POST new password
app.post("/api/passwords", async (req, res) => {
    try {
        const { site, username, password,owner } = req.body;
        if (!site || !username || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const newPassword = new Password({ site, username, password,owner });
        const saved = await newPassword.save();

        // send back the actual saved object including _id
        res.status(201).json(saved);
    } catch (err) {
        console.error("Error saving password:", err);
        res.status(500).json({ message: "Something went wrong in POST /passwords" });
    }
});

// DELETE a password
app.delete("/api/passwords/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Password.findByIdAndDelete(id);
        res.json({ message: "Password deleted successfully" });
    } catch (err) {
        console.error("Error deleting password:", err);
        res.status(500).json({ message: "Something went wrong in DELETE /passwords/:id" });
    }
});

// PUT update a password
app.put("/api/passwords/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { site, username, password } = req.body;
        const updated = await Password.findByIdAndUpdate(id, { site, username, password }, { new: true });
        res.json(updated);
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).json({ message: "Something went wrong in PUT /passwords/:id" });
    }
});

// ---------------------- User Routes ----------------------

// Signup
app.post("/api/signup", async (req, res) => {
    console.log("Received POST /api/signup");
    try {
        const { username, email, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = new User({ username, email, password: hashed });
        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error("Error in signup route:", err);
        res.status(500).json({ message: "Something went wrong in signup route" });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('DEBUG /api/login body:', req.body);
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        console.log('DEBUG found user:', user ? { id: user._id, email: user.email, passwordHash: user.password } : null);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('DEBUG bcrypt compare result:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secretkey", { expiresIn: '6h' });

        res.json({
            message: "User login successfully",
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (err) {
        console.error("Error in login route:", err);
        res.status(500).json({ message: "Something went wrong in login route" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
