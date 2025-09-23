import { Router } from "express";
import { getAllPets, getPetById, createPet, updatePet, deletePet, deletePetDef, getAvailablePets } from "../services/pet.services.js";

//Estas son las rutas o controladores de Pet, las cuales "habilitamos" para que se puedan comunicar con nuestro servidor. 
const router = Router();
 
router.get("/pets", getAllPets);
router.get("/pets/available", getAvailablePets);
router.get("/pet/:id", getPetById);
router.post("/pet", createPet);
router.put("/pet/update/:id", updatePet);
router.put("/pet/delete/:id", deletePet);
router.delete("/pet/deleteDef/:id", deletePetDef); //NO ESTÁ EN USO, ES SOLO PARA TESTEAR


export default router