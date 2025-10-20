import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { validateRegisterUser } from "../helpers/validateRegisterUser.js";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta";
const TOKEN_EXPIRATION = "1h";


export const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;
    const errors = validateRegisterUser({ name, surname, email, password });

    if (errors.length) return res.status(400).json({ errors });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res
        .status(409)
        .json({ message: "Ya existe un usuario con ese email" });


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
