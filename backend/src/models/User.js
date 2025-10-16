import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {  
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING, // hash (bcrypt)
    allowNull: false,
  },
  role: { 
    type: DataTypes.ENUM("admin", "client", "worker"),
    allowNull: false,
  },
  registeredAt: {     
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }
}, {
  tableName: "users",   
  timestamps: false,    
});
