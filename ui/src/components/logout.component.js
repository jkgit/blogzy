import React, { useState } from 'react';

export default function Logout() {
  const [token, setToken] = useState();

  localStorage.removeItem("token");
  setToken(null);

  return(
    <div className="App">
      <header className="App-header">
        <p>
          Blogzy
        </p>
      </header>
      <h1>You are logged out</h1>
    </div>
  )
}