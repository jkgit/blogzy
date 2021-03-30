import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
 return fetch('http://localhost:3001/users/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

async function registerUser(credentials) {
 return fetch('http://localhost:3001/users', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });

    if (token.token) {
      localStorage.setItem("token", token.token);
      localStorage.setItem("email", email);
      setToken(token.token);
    }
    else {
      setMessage("Invalid login, please try again");
    }
  }

  const handleRegister = async e => {
    e.preventDefault();
    const token = await registerUser({
      email,
      password
    });

    if (token.id)
      setMessage("Registered successfully, please login");
    else
      setMessage("Unable to register, please try again");
  }

  return(
    <div className="App">
      <header className="App-header">
        <p>
          Blogzy
        </p>
      </header>
      {message &&
        <p>{message}</p>
      }
      <form>
        <label>
          <p>Email</p>
          <input type="text"  onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password"  onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}