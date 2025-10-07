import { Shelter } from "./Shelter.js";
import { Pet } from "./Pet.js";

// Un refugio tiene muchas mascotas
Shelter.hasMany(Pet, {
    foreignKey: "shelterId",
    as: "pets",
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
});

// Una mascota pertenece a un refugio
Pet.belongsTo(Shelter, {
    foreignKey: "shelterId",
    as: "shelter",
});
