import { Router } from "express";
import { getAllShelters, getAvailableShelters, createShelter, updateShelter, deleteShelter } from "../services/shelter.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = Router();

router.get("/shelters", verifyToken, verifyRole("admin"), getAllShelters);
router.get("/shelters/available", verifyToken, verifyRole("admin"), getAvailableShelters);
router.post("/shelters", verifyToken, verifyRole("admin"), createShelter);
router.put("/shelters/:id", verifyToken, verifyRole("admin"), updateShelter);
router.delete("/shelters/:id", verifyToken, verifyRole("admin"), deleteShelter);

export default router;
