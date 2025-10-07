import express from "express";
import { Shelter } from "../models/Shelter.js";

const router = express.Router();

// Crear refugio
router.post("/", async (req, res) => {
    try {
        const { name, address, email, maxCapacity, available } = req.body;

        const newShelter = await Shelter.create({
        name,
        address,
        email,
        maxCapacity,
        available,
        });

        res.status(201).json(newShelter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 🔹 Traer todos los refugios
router.get("/", async (req, res) => {
    try {
        const shelters = await Shelter.findAll(); // trae todos los refugios
        res.status(200).json(shelters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
