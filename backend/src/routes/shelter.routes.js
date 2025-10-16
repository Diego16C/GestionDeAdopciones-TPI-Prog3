import { Router } from "express";
import { getAllShelters, getAvailableShelters, createShelter, updateShelter, deleteShelter } from "../services/shelter.services.js";

const router = Router();

router.get("/shelters", getAllShelters);
router.get("/shelters/available", getAvailableShelters);
router.post("/shelters", createShelter);
router.put("/shelters/:id", updateShelter);
router.delete("/shelters/:id", deleteShelter);

export default router;
