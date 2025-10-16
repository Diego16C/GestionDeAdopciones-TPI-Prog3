import { Shelter } from "../models/Shelter.js";

export const getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.findAll();
        res.json(shelters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los refugios" });
    }
};

export const getAvailableShelters = async (req, res) => {
    try {
        const shelters = await Shelter.findAll({ where: { available: true } });
        res.json(shelters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener refugios disponibles" });
    }
};

export const createShelter = async (req, res) => {
    try {
        const { name, address, email, maxCapacity, available } = req.body;
        const newShelter = await Shelter.create({
        name,
        address,
        email,
        maxCapacity,
        available: available ?? true,
        });
        res.status(201).json(newShelter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el refugio" });
    }
};

export const updateShelter = async (req, res) => {
    try {
        const { id } = req.params;
        const shelter = await Shelter.findByPk(id);
        if (!shelter) return res.status(404).json({ message: "No encontrado" });

        await shelter.update(req.body);
        res.json(shelter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el refugio" });
    }
};

export const deleteShelter = async (req, res) => {
    try {
        const { id } = req.params;
        const shelter = await Shelter.findByPk(id);
        if (!shelter) return res.status(404).json({ message: "No encontrado" });

        await shelter.destroy();
        res.json({ message: "Refugio eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el refugio" });
    }
};
