import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './components/header.component';
import Logout from './components/logout.component';
import Login from './components/login.component';
import PostsList from './components/posts-list.component';
import PostsAdd from './components/posts-add.component';
import PostsDetail from './components/posts-detail.component';

function App() {
  var [token, setToken] = useState();
  var [email, setEmail] = useState();

  if(!token) {
    var storageToken = localStorage.getItem("token");
    if (!storageToken || storageToken == null) {
      return <Login setToken={setToken} />
    }
    else {
      setToken(storageToken);
      setEmail(localStorage.getItem("email"));
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header setToken={setToken} token={token}/>
        <Switch>
          <Route path="/logout" component={Logout}/>
          <Route path="/add-post" component={PostsAdd}/>
          <Route path="/show-post/:id" component={PostsDetail}/>
          <Route component={PostsList}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
