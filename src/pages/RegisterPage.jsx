import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from 'react-bootstrap/Button';


export default function RegisterPage() {
  const [newUser, setNewUser] = useState({ name: "", lastName: "", email: "", password: "" });

  const { user, register } = useAuth();

  const [checked, setChecked] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(newUser);
    } catch (error) { }
  };
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
      <div class="form-group">
        <label> First Name:
          <input
            class="form-control"
            required
            type="name"
            value={newUser.name}
            onChange={({ target }) =>
              setNewUser({ ...newUser, name: target.value })
            }
          />
        </label>
        </div>
        <div class="form-group">

        <label> Last Name:
          <input
            class="form-control"
          required
          type="lastName"
          value={newUser.lastName}
          onChange={({ target }) =>
            setNewUser({ ...newUser, lastName: target.value })
          } />
          </label>
          </div>
        <div class="form-group">
        <label> Email:
          <input
            class="form-control"
          required
          type="email"
          name="name"
          value={newUser.email}
          onChange={({ target }) =>
            setNewUser({ ...newUser, email: target.value })
          }
        />
        </label>
        </div>
        <div class="form-group">
        <label> Password:
          <input
            class="form-control"
          required
          type="password"
          minLength='8'
          value={newUser.password}
          onChange={({ target }) =>
            setNewUser({ ...newUser, password: target.value })
          }
        />  
        
        </label>
        </div>
        <div class="form-group">
        <label>
          <input
             class="form-check-input" 
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          Accepted terms and conditions
        </label>
        </div>
        <Button type="submit" class="btn btn-primary">Register</Button>
      </form>
    </div>
  );
}
