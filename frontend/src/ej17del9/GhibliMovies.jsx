import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const GhibliMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://ghibliapi.vercel.app/films');
        const data = await res.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(results);
  }, [search, movies]);

  return (
    <Container className="mt-4">
      <h1 className="mb-2 text-center"> Peliculas de Studio Ghibli</h1>

      <Form className="mb-2" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Form.Control
          type="text"
          placeholder="Buscar pelicula"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col md={4} lg={3} className="mb-4" key={movie.id}>
              <Card className="h-100 ">
                <Card.Img variant="top" src={movie.image} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    <strong>Año:</strong> {movie.release_date} <br />
                    <strong>Director:</strong> {movie.director}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron peliculas</p>
        )}
      </Row>
    </Container>
  );
};

export default GhibliMovies;
