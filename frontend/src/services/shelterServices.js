// src/services/shelterServices.js

// Obtener todos los refugios
export const getShelters = async () => {
    try {
        const res = await fetch("http://localhost:3000/shelters"); // puerto correcto
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Crear un nuevo refugio
export const createShelter = async (shelterData) => {
    try {
        const res = await fetch("http://localhost:3000/shelters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shelterData),
        });
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};
