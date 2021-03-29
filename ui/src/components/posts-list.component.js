import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostService from "../services/post.service";

export default class PostsList extends Component{
  constructor(props) {
     super(props);
     this.retrievePosts = this.retrievePosts.bind(this);

     this.state = {
       posts: [],
       currentIndex: -1
     };
  }

  componentDidMount() {
     this.retrievePosts();
  }

  retrievePosts() {
     PostService.getAll()
       .then(response => {
       this.setState({
         posts: response.data
       });
       console.log(response.data);
       })
       .catch(e => {
       console.log(e);
       });
  }

  render() {
     const { posts, currentIndex } = this.state;

     if (posts.length === 0)
       return (
         <div className="col-md-6">
           <h4>There are no posts to show you</h4>
           <Link to={"/add-post"} className="nav-link">
             Add a Post
           </Link>
         </div>
       );
     else
       return (
         <div className="col-md-6">
           <h4>Posts List</h4>

           <ul className="list-group">
           {posts &&
             posts.map((post, index) => (
             <li
               className={
               "list-group-item " +
               (index === currentIndex ? "active" : "")
               }
               onClick={() => this.visitPost(post, index)}
               key={index}
             >
               {post.title}
             </li>
             ))}
           </ul>
         </div>
       );
  }
}