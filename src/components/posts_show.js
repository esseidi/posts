import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
     this.props.deletePost(this.props.params.id)
     .then(() => { this.context.router.push('/'); });
  }

  render() {
    const {post} = this.props;

    if(!post) {
      return <div className="loader"></div>;
    }
    return (
      <div className="container">
        <ul className="pager">
          <li className="previous">
            <Link to="/">Back Io Index</Link>
            <button
              className="btn btn-danger pull-right"
              onClick={this.onDeleteClick.bind(this)}>
              Delete Post
            </button>
          </li>
        </ul>
        <h3>{post.title}</h3>
        <div className="panel-group">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h4>Category: {post.categories}</h4>
            </div>
            <div className="panel-body">
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
