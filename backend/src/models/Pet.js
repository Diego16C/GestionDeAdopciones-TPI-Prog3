import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Species } from "./Species.js";
import { Shelter } from "./Shelter.js";

export const Pet = sequelize.define("Pet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.ENUM(...Object.values(Species)),
    allowNull: false,
  },
  breed: { // e.g., Labrador, Siamese
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  sex: {
    type: DataTypes.ENUM("macho", "hembra"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.ENUM("Adoptado", "En adopcion", "Pendiente", "En Pausa"),
    allowNull: false,
    defaultValue: "En adopcion",
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  shelterId: {
      type: DataTypes.INTEGER,
      allowNull: false, // la mascota puede no estar asignada a un shelter
      references: {
        model: "shelters", // nombre de la tabla
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
}, {
  tableName: "pets",
  timestamps: false,
});

// Relaciones
Shelter.hasMany(Pet, { foreignKey: "shelterId", onDelete: "SET NULL" });
Pet.belongsTo(Shelter, { foreignKey: "shelterId" });
