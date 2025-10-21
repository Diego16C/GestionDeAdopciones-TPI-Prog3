import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import NewShelters from '../newShelters/NewShelters';

const EditShelter = ({ shelterList, onShelterUpdated }) => {
    const { id } = useParams();

    if (!shelterList || shelterList.length === 0)
        return <Spinner animation="border" className="d-block mx-auto my-5" />;

    const shelterToEdit = shelterList.find((s) => String(s.id) === id);

    if (!shelterToEdit) return <div>Refugio no encontrado</div>;

    return <NewShelters shelterToEdit={shelterToEdit} onShelterAdded={onShelterUpdated} />;
};

export default EditShelter;
