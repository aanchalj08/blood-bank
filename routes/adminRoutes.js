import express from 'express';
import { middleware } from '../middlewares/authMiddleware.js';
import { deleteDonarController, getDonarsListController, getHospitalListController, getOrganisationListController } from '../contollers/adminController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';


export const  admin= express.Router();

//Get blood DATA RECORDS
admin.get('/donar-list',middleware,adminMiddleware,getDonarsListController);

admin.get('/hospital-list',middleware,adminMiddleware,getHospitalListController);

admin.get('/organisation-list',middleware,adminMiddleware,getOrganisationListController);

admin.delete('/delete-donar/:id',middleware,adminMiddleware,deleteDonarController)