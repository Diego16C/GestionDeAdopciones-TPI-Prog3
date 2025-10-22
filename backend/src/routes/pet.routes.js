import { Router } from "express";
import { getAllPets, getPetById, createPet, updatePet, deletePet, deletePetDef, getAvailablePets, getInAdoptionPets } from "../services/pet.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
const router = Router();
 
router.get("/pets",verifyToken, verifyRole("worker", "admin"), getAllPets);
router.get("/pets/available", verifyToken, verifyRole("worker", "admin"),  getAvailablePets);
router.get("/pet/:id", verifyToken, verifyRole("worker", "admin"), getPetById);
router.post("/pet",verifyToken, verifyRole("worker", "admin"), createPet);
router.put("/pet/update/:id", verifyToken, verifyRole("worker", "admin"),updatePet);
router.put("/pet/delete/:id",verifyToken, verifyRole("worker", "admin"), deletePet);
router.delete("/pet/deleteDef/:id",verifyToken, verifyRole("worker", "admin"), deletePetDef);
router.get("/pets/in-adoption", getInAdoptionPets);

// verifyToken, verifyRole("client"),

export default router