import { Router } from "express";
import { getAllPets, getPetById, createPet, updatePet, deletePet, deletePetDef, getAvailablePets, getInAdoptionPets } from "../services/pet.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
//Estas son las rutas o controladores de Pet, las cuales "habilitamos" para que se puedan comunicar con nuestro servidor. 
const router = Router();
 
router.get("/pets",verifyToken, verifyRole("worker"), getAllPets);
router.get("/pets/available", getAvailablePets);
router.get("/pet/:id", getPetById);
router.post("/pet", createPet);
router.put("/pet/update/:id", updatePet);
router.put("/pet/delete/:id", deletePet);
router.delete("/pet/deleteDef/:id", deletePetDef); //NO ESTÁ EN USO, ES SOLO PARA TESTEAR
router.get("/pets/in-adoption", getInAdoptionPets);

// verifyToken, verifyRole("client"),

export default router