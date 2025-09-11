import { useState } from "react";
import Pets from '../pets/Pets';
import NewPet from "../newPet/NewPet";

const petInicial = [
  {
    id: 1,
    name: "Fido",
    species: "Dog",
    age: "3 years",
    breed: "Labrador",
    description: "Friendly and energetic",
    imageUrl: "https://example",
    available: true,
  },
  {
    id: 2,
    name: "Whiskers",
    species: "Cat",
    age:" 2 years" ,
    breed: "Siamese",
    description: "Calm and affectionate",
    imageUrl: "https://example",
    available: false,
  },
  {
    id: 3,
    name: "Buddy",
    species: "Dog",
    age: "4 years",
    breed: "Beagle",
    description: "Playful and loving",
    imageUrl: "https://example",
    available: false,
  },
  {
    id: 4,
    name: "Max",
    species: "Dog",
    age: "1 year",
    breed: "German Shepherd",
    description: "Intelligent and loyal",
    imageUrl: "https://example",
    available: true,
  },
];

const Data = () => {
    const [pets, setPets] = useState(petInicial)

    const handlePetAdded = (newPet) => {
        const petData = {
            ...newPet,
            id: Math.random().toString(),
        };

        setPets((prevPets) => {
            return [...prevPets, petData]
        });
    }
    return (
        <div>
            <h1>Adopcion Mascotas</h1>
            <p>Quiero adoptar!!</p>
            <NewPet onPetAdded={handlePetAdded} />
            <Pets pets={pets} />
        </div>
    )
}

export default Data;