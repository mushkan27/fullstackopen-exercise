import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import { getAll, create, setToken, remove } from './services/blogs';
import { login } from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });

  const blogFormRef = useRef();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 3000);
  };

  // Fetch blogs after login
  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        const fetchedBlogs = await getAll();
        setBlogs(fetchedBlogs);
      };
      fetchBlogs();
    }
  }, [user]);

  //check local storage for logged in user
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const loggedinUser = await login({ username, password });
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedinUser));
      setUser(loggedinUser);
      setToken(loggedinUser.token);
      setUsername('');
      setPassword('');
      showNotification(`Welcome ${loggedinUser.name}`);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        showNotification(e.response.data.error, 'error');
      } else {
        showNotification('Login failed: server error or network issue', 'error');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    showNotification('Logged out');
  };

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await create(blogObject);
      setBlogs(blogs.concat(newBlog));
      showNotification(`A new blog "${newBlog.title}" by ${newBlog.author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      showNotification('Error creating blog', 'error');
    }
  };

  const handleLike = (updatedBlog) => {
    setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog));
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setBlogs(blogs.filter(b => b.id !== id));
      showNotification('Blog deleted successfully');
    } catch (error) {
      showNotification('Error deleting blog', 'error');
    }
  };


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} onLike={handleLike} user={user} onDelete={handleDelete} />
        )}

    </div>
  );
};

export default App;