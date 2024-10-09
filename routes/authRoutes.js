import express from 'express';
import { currentUserController, loginController, registerController } from '../contollers/authController.js';
import { middleware } from '../middlewares/authMiddleware.js';

export const controller=express.Router();

controller.post('/register',registerController);

controller.post('/login',loginController);

controller.get('/current-user',middleware,currentUserController)