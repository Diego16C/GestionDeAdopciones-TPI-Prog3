import { Router } from "express";
import { getAllShelters, getAvailableShelters } from "../services/shelter.services.js";

const router = Router();
 
router.get("/shelters", getAllShelters);
router.get("/shelters/available", getAvailableShelters);


export default router