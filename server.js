import express from 'express';
import { router } from './routes/testRoutes.js';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { controller } from './routes/authRoutes.js';
import { inventory } from './routes/inventoryRoutes.js';
import { analytics } from './routes/analyticsRoutes.js';
import { admin } from './routes/adminRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Import to create __dirname

// Configure dotenv
dotenv.config();

// Database connection
connectDB();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Define routes
app.use('/api/v1', router);
app.use('/api/v1/auth', controller);
app.use('/api/v1/inventory', inventory);
app.use('/api/v1/analytics', analytics);
app.use('/api/v1/admin', admin);

// Serve static files from React app
app.use(express.static(path.join(__dirname, './client/build')));

// Handle SPA
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Define the port and start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue);
});
