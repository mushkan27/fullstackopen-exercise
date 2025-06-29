import { useState } from 'react';
import PropTypes from 'prop-types';
import { update } from '../services/blogs';

const Blog = ({ blog, onLike, user, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = async () => {
    const updatedBlog = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id || blog.user
    };

    const returnedBlog = await update(blog.id, updatedBlog);
    onLike(returnedBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      onDelete(blog.id);
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div className='blog-title'>
        {blog.title} {blog.author};
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>

      {showDetails && (
        <div className='blog-details'>
          <div className='blog-url'>{blog.url}</div>
          <div className='blog-likes'>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </div>
          <div className='blog-user'>{blog.user?.name}</div>
          {user && blog.user && (blog.user.username === user.username) && (
            <button className='blog-delete' onClick={handleDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};


export default Blog;
