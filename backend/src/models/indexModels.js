// models/indexModels.js
import { Pet } from "./Pet.js";
import { User } from "./User.js";
import { Shelter } from "./Shelter.js";
import { AdoptionRequest } from "./AdoptionRequest.js";

// Relaciones
// Un shelter puede tener muchas mascotas
Shelter.hasMany(Pet, { foreignKey: "shelterId" });
Pet.belongsTo(Shelter, { foreignKey: "shelterId" });

// Un user puede hacer muchas solicitudes de adopción
User.hasMany(AdoptionRequest, { foreignKey: "userId" });
AdoptionRequest.belongsTo(User, { foreignKey: "userId" });

// Una mascota puede tener muchas solicitudes de adopción
Pet.hasMany(AdoptionRequest, { foreignKey: "petId" });
AdoptionRequest.belongsTo(Pet, { foreignKey: "petId" });

// Si manejás "worker" como rol en User, podés hacer esto opcional:
User.hasMany(AdoptionRequest, { foreignKey: "workerId", as: "handledRequests" });
AdoptionRequest.belongsTo(User, { foreignKey: "workerId", as: "worker" });

export { Pet, User, Shelter, AdoptionRequest };
