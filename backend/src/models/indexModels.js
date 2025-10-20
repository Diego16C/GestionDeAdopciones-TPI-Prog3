// models/indexModels.js
import { Pet } from "./Pet.js";
import { User } from "./User.js";
import { Shelter } from "./Shelter.js";
import { AdoptionRequest } from "./AdoptionRequest.js";

// Relaciones
Shelter.hasMany(Pet, { foreignKey: "shelterId" });
Pet.belongsTo(Shelter, { foreignKey: "shelterId" });

User.hasMany(AdoptionRequest, { foreignKey: "userId" });
AdoptionRequest.belongsTo(User, { foreignKey: "userId" });

Pet.hasMany(AdoptionRequest, { foreignKey: "petId" });
AdoptionRequest.belongsTo(Pet, { foreignKey: "petId" });

User.hasMany(AdoptionRequest, { foreignKey: "workerId", as: "handledRequests" });
AdoptionRequest.belongsTo(User, { foreignKey: "workerId", as: "worker" });

export { Pet, User, Shelter, AdoptionRequest };
