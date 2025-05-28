import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';

const API_KEY = 'SUA_API_KEY_AQUI'; // Coloque sua chave da API TMDB aqui

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          query
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      alert('Erro ao buscar filmes');
    }
    setLoading(false);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">🎬 Buscador de Filmes (TMDB API)</h2>
      <Form className="d-flex mb-4" onSubmit={e => { e.preventDefault(); searchMovies(); }}>
        <Form.Control
          type="text"
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button variant="primary" className="ms-2" onClick={searchMovies}>Buscar</Button>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {movies.map(movie => (
            <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.release_date}</Card.Text>
                  <Card.Text>{movie.overview.slice(0, 100)}...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default App;
