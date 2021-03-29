import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login.component';
import PostsList from './components/posts-list.component';
import PostsAdd from './components/posts-add.component';

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
          <Route path="/posts" component={PostsList}/>
          <Route path="/add-post" component={PostsAdd}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
