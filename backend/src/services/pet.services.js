import { Pet } from "../models/Pet.js";
import { Shelter } from "../models/Shelter.js";

export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: ["Shelter"] 
    });
    res.json(pets);
  } catch (error) {
    res.status(500).send("Error al obtener las mascotas");
  }
};

export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
   const pet = await Pet.findByPk(id, {
      include: {
        model: Shelter,
        attributes: ["id", "name"], 
      },
    });
    if (!pet) return res.status(404).send("Mascota no encontrada");
    res.json(pet);
  } catch (error) {
    res.status(500).send("Error al buscar la mascota");
  }
};

export const createPet = async (req, res) => {
  try {
    const {
      name,
      species,
      age,
      breed,
      sex,
      description,
      imageUrl,
      state,
      available,
      shelterId
    } = req.body;

    const newPet = await Pet.create({
      name,
      species,
      age,
      breed,
      sex,
      description,
      imageUrl,
      state,
      available,
      shelterId
    });

    res.json(newPet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la mascota");
  }
};

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);

    if (!pet) return res.status(404).send("Mascota no encontrada");

    await pet.update(req.body); // merge automático de todos los campos
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la mascota");
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).send("Mascota no encontrada");

    await pet.update({ available: false });
    res.send(`Mascota Nro: ${id} dada de baja correctamente`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al dar de baja la mascota");
  }
};

export const deletePetDef = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).send("Mascota no encontrada");

    await pet.destroy();
    res.send(`Mascota Nro: ${id} eliminada correctamente`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar la mascota");
  }
};

export const getAvailablePets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      where: { available: true },
      include: ["Shelter"]
    });
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al buscar las mascotas disponibles");
  }
};




export const getInAdoptionPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      where: { state: "En adopcion", available: true },
      include: [
        {
          model: Shelter,
          attributes: ["id", "name"],
        },
      ],
    });

    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las mascotas en adopción");
  }
};



export const PetService = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,  
  deletePet,
  deletePetDef,
  getAvailablePets,
  getInAdoptionPets
};
