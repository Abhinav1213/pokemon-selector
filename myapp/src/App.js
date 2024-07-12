import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Form, Button,CardImg, CardBody } from 'react-bootstrap';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
      });
  }, []);

  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      const data = await response.json();
      const filteredPokemon = data.results.filter((pok) => pok.name.includes(search.toLowerCase()));
      setPokemon(filteredPokemon);
    } catch (err) {
      console.error('Error fetching Pokemon:', err);
    }
  
    console.log('val (after state update):', pokemon); 
  };


  return (
    <Container fluid> {/* Make the container fluid for full width */}
      <Container className="d-flex justify-content-center">
        <Row>
          <Form onSubmit={handleSubmit}
            style={{
              "display": "flex",
              "margin":"5px"
            }}
          >
              <Form.Group controlId="formBasicSearch">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="mb-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
        </Row>
      </Container>
      <Row className="justify-content-center">
        {pokemon.map((poke) => (
          <Col key={poke.name} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <CardImg
                variant="top"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  poke.url.split('/')[6]
                }.png`}
                alt={poke.name}
              />
              <CardBody>
                <Card.Title>{poke.name}</Card.Title>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
