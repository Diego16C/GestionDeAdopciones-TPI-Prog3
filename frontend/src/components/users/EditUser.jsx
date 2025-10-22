import { useParams } from 'react-router';
import NewUser from './NewUser';

const EditUser = ({ userList, onUserUpdated }) => {
  const { id } = useParams();
  const userToEdit = userList.find((u) => String(u.id) === id);

  if (!userToEdit) {
    return <div>Usuario no encontrado</div>;
  }

  return <NewUser userToEdit={userToEdit} onUserAdded={onUserUpdated} />;
};

export default EditUser;