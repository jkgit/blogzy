import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Posts from './Posts';

function App() {
  var [token, setToken] = useState();

  if(!token) {
    token = localStorage.getItem("token");
    if (!token || token == null)
      return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Blogzy
        </p>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/posts">
            <Posts />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
