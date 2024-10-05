import express from 'express';
import multer from 'multer';
import path from 'path';
import { login, signup } from '../Controller/signupController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Signup route
router.post('/signup', upload.single('profilepic'), signup);

// Login route
router.post('/login', login);

// Protected route example (optional)
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route', userId: req.userId });
});

export default router;
