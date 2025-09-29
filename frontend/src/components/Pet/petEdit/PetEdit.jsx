import { useParams } from 'react-router';
import NewPet from './NewPet';

const EditPet = ({ petList, onPetUpdated }) => {
  const { id } = useParams();

  const petToEdit = petList.find((p) => String(p.id) === id);

  if (!petToEdit) {
    return <div>Mascota no encontrada</div>;
  }

  return <NewPet petToEdit={petToEdit} onPetAdded={onPetUpdated} />;
};

export default EditPet;
