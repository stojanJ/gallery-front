import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from 'react-bootstrap/Button';

export default function LoginPage() {
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const { user, login } = useAuth();

  const handleOnLogin = async (e) => {
    e.preventDefault();
    try {
      await login(newUser);
    } catch (error) {}
  };
  
  return (
    <div className="App">
      <form onSubmit={handleOnLogin}>
        <label>Email:
          <input
          required
          type="email"
          name="name"
          value={newUser.email}
          onChange={({ target }) =>
            setNewUser({ ...newUser, email: target.value })
          }
        /></label>
        <label> Password:
          <input
          required
          type="password"
          value={newUser.password}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password: target.value })
          }
        /></label>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
