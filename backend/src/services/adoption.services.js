import { Pet } from "../models/Pet.js";
import { AdoptionRequest } from "../models/AdoptionRequest.js";
import { User } from "../models/User.js";
import { Shelter } from "../models/Shelter.js";

export const requestAdoption = async (req, res) => {
  try {
    const { petId, userId } = req.body; 

    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    if (pet.state !== "En adopcion" || !pet.available) {
      return res
        .status(400)
        .json({ message: "Esta mascota no está disponible para adopción" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.role !== "client") {
      return res
        .status(403)
        .json({ message: "Solo los usuarios con rol de cliente pueden solicitar adopciones" });
    }

    const existingRequest = await AdoptionRequest.findOne({
      where: { petId, userId, status: "pending" },
    });

    if (existingRequest) {
      return res
        .status(409)
        .json({ message: "Ya existe una solicitud pendiente para esta mascota" });
    }

    const newRequest = await AdoptionRequest.create({
      petId,
      userId,
      status: "pending",
    });

    await pet.update({ state: "Pendiente" });

    const result = await AdoptionRequest.findByPk(newRequest.id, {
      include: [
        { model: Pet, attributes: ["id", "name", "species", "state"] },
        { model: User, attributes: ["id", "name", "email"] },
      ],
    });

    return res.status(201).json({
      message: "Solicitud de adopción creada correctamente",
      adoptionRequest: result,
    });
  } catch (error) {
    console.error("Error al solicitar adopción:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const approveAdoption = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerId, comments } = req.body;

    const request = await AdoptionRequest.findByPk(id, { include: Pet });
    if (!request) return res.status(404).json({ message: "Solicitud no encontrada" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "La solicitud ya fue procesada" });

    await request.update({
      status: "approved",
      resolutionDate: new Date(),
      workerId,
      comments,
    });

    await request.Pet.update({ state: "Adoptado", available: false });

    res.json({
      message: "Solicitud aprobada correctamente",
      adoptionRequest: request,
    });
  } catch (error) {
    console.error("Error al aprobar adopción:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const rejectAdoption = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerId, comments } = req.body;

    const request = await AdoptionRequest.findByPk(id, { include: Pet });
    if (!request) return res.status(404).json({ message: "Solicitud no encontrada" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "La solicitud ya fue procesada" });

    await request.update({
      status: "rejected",
      resolutionDate: new Date(),
      workerId,
      comments,
    });

    await request.Pet.update({ state: "En adopcion", available: true });

    res.json({
      message: "Solicitud rechazada correctamente",
      adoptionRequest: request,
    });
  } catch (error) {
    console.error("Error al rechazar adopción:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const getPendingRequests = async (req, res) => {
  try {
    const pending = await AdoptionRequest.findAll({
      where: { status: "pending" },
      include: [
        {
          model: Pet,
          attributes: ["id", "name", "species", "state", "imageUrl"],
          include: [{ model: Shelter, attributes: ["id", "name"] }],
        },
        { model: User, attributes: ["id", "name", "email"] },
      ],
    });

    res.json(pending);
  } catch (error) {
    console.error("Error al obtener solicitudes pendientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const getAllUserAdoptionRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const requests = await AdoptionRequest.findAll({
      where: { userId },
      include: [
        {
          model: Pet,
          attributes: ['id', 'name', 'species', 'age', 'breed', 'imageUrl', 'state'],
          include: [{ model: Shelter, attributes: ['id', 'name'] }],
        },
        {
          model: User,
          as: 'worker',
          attributes: ['id', 'name', 'surname', 'email'],
        },
      ],
    });

    res.json(requests);
  } catch (error) {
    console.error('Error al obtener solicitudes de adopción del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
