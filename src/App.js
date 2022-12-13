import './App.css';
import React from 'react';
import Router from "./Router";
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
    <div className="App">
        <Router />
    </div>
    </Container>
  </Container>
  );
}

export default App;
