import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Signup from '../Model/signupModel.js';

dotenv.config();

// Signup logic
export const signup = async (req, res) => {
    const { email, name, mobile, address, state, pincode, handlename, password } = req.body;

    try {
        if (!email || !name || !mobile || !address || !state || !pincode || !handlename || !password || !req.file) {
            return res.status(400).send("All fields are required, including the profile pic.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await Signup.create({
            email,
            name,
            mobile,
            address,
            state,
            pincode,
            handlename,
            password: hashedPassword, // Store the hashed password
            profilepic: `http://localhost:3000/uploads/${req.file.filename}`, // Use the public link format
        });

        res.status(201).json({ message: 'User signed up successfully', Signup: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
};

// Login logic
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await Signup.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Logged in successfully', token, profilepic: user.profilepic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};
