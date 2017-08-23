import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../actions";

class PostIndex extends Component {
  // called immediately after this Component is put in the DOM
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link to={`/posts/${post.id}`} key={post.id} className="list-group-item list-group-item-action">
          Title: {post.title} <br />
          Categories: {post.categories || 'None'} <br />
          {parseInt(post.content.length) > 30 ? post.content.slice(0, 30) + '...' : post.content}
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            New Post
          </Link>
        </div>
        <h1>Posts</h1>
        <div className="list-group">
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostIndex);
