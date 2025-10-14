import { Shelter } from "../models/Shelter.js";

export const getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.findAll();
        res.json(shelters);
    } catch (error) {
        res.status(500).send("Error al obtener los refugios");
    }
}

export const getAvailableShelters = async (req, res) => {
    try {
        const shelters = await Shelter.findAll({
            where: { available: true }
        });
        res.json(shelters);
    }
    catch (error) {
        res.status(500).send("Error al obtener los refugios disponibles");
    }
}