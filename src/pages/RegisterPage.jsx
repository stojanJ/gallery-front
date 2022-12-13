import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from 'react-bootstrap/Button';


export default function RegisterPage() {
  const [newUser, setNewUser] = useState({ name: "", lastName: "", email: "", password: "" });

  const { user, register } = useAuth();

  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false); 

  const handleChange = () => {
    setChecked(!checked);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!checked){
        setShowError(true);
        return
      }
      await register(newUser);
    } catch (error) { }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
      <div className="form-group">
        <label> First Name:
          <input
            className="form-control"
            required
            type="name"
            value={newUser.name}
            onChange={({ target }) =>
              setNewUser({ ...newUser, name: target.value })
            }
          />
        </label>
        </div>
        <div className="form-group">

        <label> Last Name:
          <input
            className="form-control"
          required
          type="lastName"
          value={newUser.lastName}
          onChange={({ target }) =>
            setNewUser({ ...newUser, lastName: target.value })
          } />
          </label>
          </div>
        <div className="form-group">
        <label> Email:
          <input
            className="form-control"
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
        <div className="form-group">
        <label> Password:
          <input
            className="form-control"
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
        <div className="form-group">
        <label>
          <input
             className="form-check-input" 
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          Accepted terms and conditions
        </label>
        {showError ? <p>Terms and conditions are required</p> : ""}
        </div>
        <Button type="submit" className="btn btn-primary">Register</Button>
      </form>
    </div>
  );
}
