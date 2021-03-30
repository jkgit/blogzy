import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostService from "../services/post.service";

export default class PostsAdd extends Component {
  constructor(props) {
     super(props);
     this.onChangeTitle = this.onChangeTitle.bind(this);
     this.onChangeDescription = this.onChangeDescription.bind(this);
     this.onChangeBody = this.onChangeBody.bind(this);
     this.savePost = this.savePost.bind(this);
     this.newPost = this.newPost.bind(this);

     this.state = {
       id: null,
       title: "",
       description: "",
       body: "",
       error: null,

       submitted: false
     };
  }

  onChangeTitle(e) {
     this.setState({
       title: e.target.value
     });
  }

  onChangeDescription(e) {
     this.setState({
       description: e.target.value
     });
  }

  onChangeBody(e) {
     this.setState({
       body: e.target.value
     });
  }

  savePost() {
     this.setState({message: null})
     var data = {
       title: this.state.title,
       description: this.state.description,
       body: this.state.body
     };

     PostService.create(data)
       .then(response => {
       this.setState({
         id: response.data.id,
         title: response.data.title,
         description: response.data.description,
         body: response.data.body,

         submitted: true
       });
       console.log(response.data);
       })
       .catch(e => {
        this.setState({message: "Unable to create new post, all fields are required"});
        console.log(e);
       });
  }

  newPost() {
     this.setState({
       id: null,
       title: "",
       description: "",
       body: "",

       submitted: false
     });
  }

  render() {
     return (
       <div className="submit-form">
       {this.state.message &&
         <p>{this.state.message}</p>
       }
       {this.state.submitted ? (
         <div>
         <h4>Your post has been submitted!</h4>
         <button className="btn btn-success" onClick={this.newPost}>
           Add Another
         </button>
         </div>
       ) : (
         <div>
         <div className="form-group">
           <label htmlFor="title">Title</label>
           <input
           type="text"
           className="form-control"
           id="title"
           required
           value={this.state.title}
           onChange={this.onChangeTitle}
           name="title"
           />
         </div>

         <div className="form-group">
           <label htmlFor="description">Description</label>
           <input
           type="text"
           className="form-control"
           id="description"
           required
           value={this.state.description}
           onChange={this.onChangeDescription}
           name="description"
           />
         </div>

         <div className="form-group">
           <label htmlFor="description">Body</label>
           <textarea
           className="form-control"
           id="body"
           required
           value={this.state.body}
           onChange={this.onChangeBody}
           name="body"
           />
         </div>

         <button onClick={this.savePost} className="btn btn-success">
           Submit
         </button>
         </div>
       )}
       </div>
     );
  }
}