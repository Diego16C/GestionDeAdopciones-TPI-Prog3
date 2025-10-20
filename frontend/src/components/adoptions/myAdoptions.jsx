import { useEffect, useState } from 'react';
import NewPet from '../Pet/newPet/NewPet';
import Pets from '../Pet/Pets/Pets';
import PetDetails from '../Pet/petDetails/PetDetails';
import { Row, Button, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router';
import { getAllUserAdoptionRequests } from '../../services/adoptionServices';

const MyAdoptions = () => {
  const [myAdoptionList, setMyAdoptionList] = useState([]);

  const fetchMyAdoptions = async () => {
    try {
      const data = await getAllUserAdoptionRequests();
      setMyAdoptionList([...data]);
    } catch (error) {
      console.error('Error fetching my adoptions:', error);
    }
  };
  useEffect(() => {
    fetchMyAdoptions();
  }, []);

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
            <h2 className="text-center m-0" style={{ textAlign: 'center' }}>
              Mis Adopciones de Mascotas
            </h2>
          </div>
        </Col>
      </Row>

      <Routes>
        <Route index element={<Pets petList={myAdoptionList} />} />
      </Routes>
    </div>
  );
};
export default MyAdoptions;
