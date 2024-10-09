import express from 'express';
import { middleware } from '../middlewares/authMiddleware.js';
import { bloodGroupDetailsController } from '../contollers/analyticsController.js';


export const analytics = express.Router();

//Get blood DATA RECORDS
analytics.get('/bloodGroups-data',middleware,bloodGroupDetailsController);

