import { User } from "../models/User";

register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await User.create({ name, email, password, role });
        res.json(newUser);
    }
    catch (error) {
        res.status(500).send("Error al registrar el usuario");
    }
};

login = async (req, res) => {
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
};

export const AuthService = {
    register,
    login
};

