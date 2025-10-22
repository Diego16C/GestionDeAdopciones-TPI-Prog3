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
        <Col
          xs={8}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            style={{ width: '100%', paddingLeft: '550px', fontSize: '40px' }}
          >
            <h2 className="text-center m-0">Gestión de Usuarios</h2>
          </div>
        </Col>
        <Col xs={4} className="d-flex justify-content-end align-items-center">
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
        <Route
          path="add-user"
          element={<NewUser onUserAdded={fetchAllUsers} />}
        />
        <Route
          path="edit/:id"
          element={
            <EditUser userList={userList} onUserUpdated={fetchAllUsers} />
          }
        />
      </Routes>
    </div>
  );
};

export default DashboardABMusers;
