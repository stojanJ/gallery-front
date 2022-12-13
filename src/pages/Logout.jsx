import React from "react";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function Logout() {
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleLogOut = async (e) => {
    // e.preventDefault();
    try {
      await logout(user);
      history.push("/login");
    } catch (error) { }
  };
  return (
    <div>
      <Button onClick={() => handleLogOut(user.id)}>Log out</Button>
    </div>
  )
}