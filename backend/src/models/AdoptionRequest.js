import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const AdoptionRequest = sequelize.define("AdoptionRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
  requestDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  resolutionDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: "adoption_requests",
  timestamps: false,
});
/// faltan las forein keys de user, pet y worker