import { Sequelize } from "sequelize";

// En este archivo estamos instanciando nuestra base de datos
export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./adoptionManagementDB.db",
    logging: false // desactiva logs de SQL en consola
});