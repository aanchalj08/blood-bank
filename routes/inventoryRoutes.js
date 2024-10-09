import express from 'express';
import { middleware } from '../middlewares/authMiddleware.js';
import { createInventoryController, getDonarsController, getHospitalsController, getInventoryController, getInventoryHospitalController, getOrganisationController, getOrganisationForHospitalController, getRecentInventoryController } from '../contollers/inventoryController.js';

export const inventory = express.Router();

inventory.post('/create-inventory',middleware,createInventoryController);

inventory.get('/get-inventory',middleware,getInventoryController);

inventory.get('/get-recent-inventory',middleware,getRecentInventoryController);

inventory.post('/get-inventory-hospital',middleware,getInventoryHospitalController);

inventory.get('/get-donars',middleware,getDonarsController);

inventory.get('/get-hospitals',middleware,getHospitalsController);

inventory.get('/get-organisation',middleware,getOrganisationController);

inventory.get('/get-organisation-for-hospital',middleware,getOrganisationForHospitalController);