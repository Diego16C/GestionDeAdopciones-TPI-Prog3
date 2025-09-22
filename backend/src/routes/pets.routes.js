import { Router } from "express";
import { Pet } from "../models/Pet.js";

//Estas son las rutas o controladores de Pet, las cuales "habilitamos" para que se puedan comunicar con nuestro servidor. 
const router = Router();

router.get("/pets", async (req, res) => {
    const pets = await Pet.findAll();
    res.json(pets);
});

router.get("/pet/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    res.json(pet);
    } catch (error) {
        res.status(500).send("Error al buscar la mascota");
    }
});

router.post("/pet", async (req, res) => {
    try {
    const {name, species, age, breed, description, imageUrl, available} = req.body;
    const newPet = await Pet.create({name, species, age, breed, description, imageUrl, available } );
    res.json(newPet);   
    } catch (error) {
        res.status(500).send("Error al crear la mascota");
    }
});

router.put("/pet/update/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    pet.update(req.body);
    res.send(`Mascota Nro: ${id} actualizada correctamente`);
    } catch (error) {
        res.status(500).send("Error al actualizar la mascota");
    }
});

router.post("/pet/delete/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    pet.update({ available: false });
    res.send(`Mascota Nro: ${id} dada de baja correctamente`);
    } catch (error) {
        res.status(500).send("Error al dar de baja la mascota");
    }
});

//NO ESTÁ EN USO, ES SOLO PARA TESTEAR
router.delete("/pet/deleteDef/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    pet.destroy();
    res.send(`Mascota Nro: ${id} eliminada correctamente`);
    } catch (error) {
        res.status(500).send("Error al eliminar la mascota");
    }
});

export default router