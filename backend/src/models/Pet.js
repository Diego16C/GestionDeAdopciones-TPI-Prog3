import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

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
    species: {  // e.g., dog, cat, bird
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    breed: { // e.g., Labrador, Siamese
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,

    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, { timestamps: false });