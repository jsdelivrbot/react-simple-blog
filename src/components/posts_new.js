import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CREATE_POST, createPost } from "../actions";

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          type="text"
          className="form-control"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log("Posting form data...");
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="title" name="title" component={this.renderField} />
          <Field label="categories" name="categories" component={this.renderField} />
          <Field
            label="post content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/posts" className="btn btn-secondary">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}
// automatically called when form data is submitted
function validate(values) {
  const errors = {};
  // validates input from values
  if (!values.title) errors.title = "Enter a title.";
  if (!values.categories) errors.categories = "Enter some catagories.";
  if (!values.content) errors.content = "Enter some content.";
  // if errors is empty the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
