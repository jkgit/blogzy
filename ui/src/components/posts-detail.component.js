import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostService from "../services/post.service";

export default class PostsDetail extends Component {
  constructor(props) {
     super(props);
     this.onChangeTitle = this.onChangeTitle.bind(this);
     this.onChangeDescription = this.onChangeDescription.bind(this);
     this.onChangeBody = this.onChangeBody.bind(this);
     this.getPost = this.getPost.bind(this);
     this.updatePost = this.updatePost.bind(this);
     this.deletePost = this.deletePost.bind(this);

     this.state = {
       currentPost: {
       id: null,
       title: "",
       description: "",
       body: ""
       },
       message: ""
     };
  }

  componentDidMount() {
     this.getPost(this.props.match.params.id);
  }

  onChangeTitle(e) {
     const title = e.target.value;

     this.setState(function(prevState) {
       return {
       currentPost: {
         ...prevState.currentPost,
         title: title
       }
       };
     });
  }

  onChangeDescription(e) {
     const description = e.target.value;

     this.setState(prevState => ({
       currentPost: {
       ...prevState.currentPost,
       description: description
       }
     }));
  }

  onChangeBody(e) {
     const body = e.target.value;

     this.setState(prevState => ({
       currentPost: {
       ...prevState.currentPost,
       body: body
       }
     }));
  }

  getPost(id) {
     PostService.get(id)
       .then(response => {
       this.setState({
         currentPost: response.data
       });
       console.log(response.data);
       })
       .catch(e => {
       console.log(e);
       });
  }

  updatePost() {
     PostService.update(
       this.state.currentPost.id,
       this.state.currentPost
     )
       .then(response => {
       console.log(response.data);
       this.setState({
         message: "The post was updated successfully!"
       });
       })
       .catch(e => {
       console.log(e);
       });
  }

  deletePost() {
     PostService.delete(this.state.currentPost.id)
       .then(response => {
       console.log(response.data);
       this.props.history.push('/posts')
       })
       .catch(e => {
       console.log(e);
       });
  }

  render() {
     const { currentPost } = this.state;

     if (currentPost.user) {
       return (
         <div>
         {currentPost.user.email == localStorage.getItem("email") ? (
           <div className="edit-form">
           <h4>Post</h4>
           <form>
             <div className="form-group">
             <label htmlFor="title">Title</label>
             <input
               type="text"
               className="form-control"
               id="title"
               value={currentPost.title}
               onChange={this.onChangeTitle}
             />
             </div>
             <div className="form-group">
             <label htmlFor="description">Description</label>
             <input
               type="text"
               className="form-control"
               id="description"
               value={currentPost.description}
               onChange={this.onChangeDescription}
             />
             </div>
             <div className="form-group">
             <label htmlFor="description">Body</label>
             <textarea
               className="form-control"
               id="body"
               value={currentPost.body}
               onChange={this.onChangeBody}
             />
             </div>
           </form>

           <button
             className="badge badge-danger mr-2"
             onClick={this.deletePost}
           >
             Delete
           </button>

           <button
             type="submit"
             className="badge badge-success"
             onClick={this.updatePost}
           >
             Update
           </button>
           <p>{this.state.message}</p>
           </div>
         ) : (
           <div className="view-post">
             <h4>{currentPost.title}</h4>
             <h5>{currentPost.description}</h5>
             <p>{currentPost.user.email}</p>
             <p>{currentPost.body}</p>
           </div>
         )}
         </div>
      );
    }
    else {
      return null;
    }
  }
}