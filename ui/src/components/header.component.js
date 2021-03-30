import React, { useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import Login from './login.component';

export default function Header({ token, setToken }) {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
  }

  function addPost() {
    history.push("/add-post");
  }

  function viewPosts() {
    history.push("/");
  }

  return (
    <header className="App-header">
      <p>
        Blogzy
        { token &&
          <div>
            <button className="nav-link" onClick={addPost}>
              Add Post
            </button>
            <button className="nav-link" onClick={viewPosts}>
              View Posts
            </button>
            <button className="nav-link" onClick={logout}>
              Logout
            </button>
          </div>
        }
      </p>
    </header>
  );
}