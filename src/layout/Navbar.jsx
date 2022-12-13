import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const logoutUser = () => {
    logout();
  }

  return (
    <Nav className="justify-content-lest">
      <ul>
        <Nav.Item>
          <Link to="/">All Galleries</Link>
        </Nav.Item>
        {!user.name && (
          <Nav.Item>
            <Link to="/login">Login</Link>
          </Nav.Item>
        )}
        {!user.name && (
          <Nav.Item>
            <Link to="/register">Register</Link>
          </Nav.Item>
        )}
        {user.name && (
          <Nav.Item>
            <Link to={`/my-galleries/${user.id}`} >My Galleries</Link>
          </Nav.Item>
        )}
        {user.name && (
          <Nav.Item>
            <Link to="/create">Create New Gallery</Link>
          </Nav.Item>
        )}
        {user.name && (
          <Nav.Item>
            <Button onClick={logoutUser}>Logout</Button>
          </Nav.Item>
        )}
      </ul>
    </Nav>
  );
}

