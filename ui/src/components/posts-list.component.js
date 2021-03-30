import React, { Component } from "react";
import { Link } from "react-router-dom";
import PostService from "../services/post.service";

export default class PostsList extends Component{
  constructor(props) {
     super(props);
     this.retrievePosts = this.retrievePosts.bind(this);
     this.nextPage = this.nextPage.bind(this);
     this.previousPage = this.previousPage.bind(this);

     this.state = {
       postResults: {posts:[], current_page: 0, max_page: 0},
       currentIndex: -1
     };
  }

  componentDidMount() {
     this.retrievePosts();
  }

  retrievePosts(page) {
     PostService.getAll(page)
       .then(response => {
       this.setState({
         postResults: response.data
       });
       console.log(response.data);
       })
       .catch(e => {
       console.log(e);
       });
  }

  previousPage() {
     const { postResults, currentIndex } = this.state;
     this.retrievePosts(postResults.current_page-1);
  }

  nextPage() {
     const { postResults, currentIndex } = this.state;
     this.retrievePosts(postResults.current_page+1);
  }

  render() {
     const { postResults, currentIndex } = this.state;

     return (
       <div>
         {postResults.posts.length === 0 ?
             <div>
               There are no posts to show you
             </div> :
             <div class="container">
             {postResults &&
               postResults.posts.map((post, index) => (
                <div class="row bottom-space">
                  <div class=".col-md-8 text-left">
                    <Link to={`/show-post/${post.id}`}>{post.title}</Link><br/>
                    <div class="lead">{post.description}</div>
                    <footer>{post.user.email} {post.created_at}</footer>
                  </div>
                </div>
               ))}
             </div>
         }
         {postResults.current_page > 0 &&
           <button onClick={this.previousPage}>
             Previous Page
           </button>
         }
         {postResults.current_page < postResults.max_pages &&
           <button onClick={this.nextPage}>
             Next Page
           </button>
         }
       </div>
     );
  }
}