import { useEffect, useState } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router';
import { fetchUsers } from '../../services/userServices';
import Users from '../users/Users';
import UserDetails from '../users/UserDetails';
import NewUser from '../users/NewUser';
import EditUser from '../users/EditUser';

const DashboardABMusers = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const data = await fetchUsers();
      setUserList([...data]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleNavigateToAddUser = () => {
    navigate('/users/add-user');
  };

  return (
    <div>
      <Row className="align-items-center w-100 my-3">
        <Col xs="auto" className="d-flex justify-content-start">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <h2 className="m-0">Gestión de Usuarios</h2>
        </Col>
        <Col xs="auto" className="d-flex justify-content-end">
          <Button
            className="me-3"
            variant="dark"
            onClick={handleNavigateToAddUser}
          >
            Agregar Usuario
          </Button>
        </Col>
      </Row>

      <Routes>
        <Route
          index
          element={<Users userList={userList} onUserDeleted={fetchAllUsers} />}
        />
        <Route path=":id" element={<UserDetails userList={userList} />} />
        <Route path="add-user" element={<NewUser onUserAdded={fetchAllUsers} />} />
        <Route
          path="edit/:id"
          element={<EditUser userList={userList} onUserUpdated={fetchAllUsers} />}
        />
      </Routes>
    </div>
  );
};

export default DashboardABMusers;
