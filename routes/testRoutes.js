import express from "express";
import { testController } from "../contollers/testController.js";

export const router=express.Router();

router.get('/test',testController);




