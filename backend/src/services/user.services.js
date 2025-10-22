import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'surname', 'email', 'role', 'registeredAt'],
            order: [['id', 'ASC']]
        });
        return res.json(users);
    } catch (error) {
        console.error("Error lista de usuarios:", error);
        return res.status(500).json({ message: "Error al obtener la lista de usuarios" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, password, role = "worker", name = null, surname = null } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        const allowedRoles = ["admin", "worker"];
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ message: `Role inválido. Roles permitidos: ${allowedRoles.join(", ")}` });
        }

        const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Ya existe un usuario con ese email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashed,
      role,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("createUser error:", error);
    return res.status(500).json({ message: "Error al crear usuario" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, name, surname, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const allowedRoles = ["admin", "worker", "client"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: `Role inválido. Roles permitidos: ${allowedRoles.join(", ")}` });
    }

    if (req.user && req.user.id === user.id && role && role !== user.role) {
      return res.status(403).json({ message: "No puedes cambiar tu propio rol" });
    }

    if (email) user.email = email;
    if (role) user.role = role;
    if (name !== undefined) user.name = name;
    if (surname !== undefined) user.surname = surname;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("updateUser error:", error);
    return res.status(500).json({ message: "Error al actualizar usuario" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user && String(req.user.id) === String(id)) {
      return res.status(400).json({ message: "No puedes eliminar tu propio usuario" });
    }

    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("deleteUser error:", error);
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
};