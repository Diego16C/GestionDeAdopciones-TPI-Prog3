import { Router } from "express";
import { User } from "../models/User";
import {AuthService} from "../services/auth.services.js"

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await User.create({ name, email, password, role });
        res.json(newUser);
    }
    catch (error) {
        res.status(500).send("Error al registrar el usuario");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email, password } });

        if (user) {
            res.json(user);
        } else {
            res.status(401).send("Credenciales inválidas");
        }   
    } catch (error) {
        res.status(500).send("Error al iniciar sesión");
    }
});



export default router