import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions";

class PostShow extends Component {
  // fetches post when component mounts to DOM
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Fetching your post...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">
          Back To Posts
        </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h1>
          {post.title}
        </h1>
        <p>
          Catagories: {post.categories}
        </p>
        <p>
          {post.content}
        </p>
      </div>
    );
  }
}
// puts post on this.props
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
