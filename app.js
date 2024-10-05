import dotenv from 'dotenv';
import express from 'express';
import { dirname, join } from 'path'; // Importing dirname and join
import { fileURLToPath } from 'url'; // Importing fileURLToPath
import sequelize from './Database/database.js';
import authRoutes from './Routes/signupRoutes.js';

// Setting __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'uploads'))); // Serve uploaded images

// Routes
app.use('/api/user', authRoutes);

// Test DB connection and sync models
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); // Sync all models
    })
    .catch(err => console.error('Error: ' + err));

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
