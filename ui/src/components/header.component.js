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
    <div>
      <header className="App-header">
        <p>
          Blogzy
          { token &&
            <div>
              <button class="btn btn-primary btn-xs" onClick={addPost}>
                Add Post
              </button>
              <button class="btn btn-primary btn-xs btn-padded" onClick={viewPosts}>
                View Posts
              </button>
              <button class="btn btn-primary btn-xs btn-padded" onClick={logout}>
                Logout
              </button>
            </div>
          }
        </p>
      </header>
      <br/>
    </div>
  );
}