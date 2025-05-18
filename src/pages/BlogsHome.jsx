import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BlogsHome.css';

const BlogsHome = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:4500/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Re-fetch blogs when location changes (e.g., after navigating back from AddBlog)
  useEffect(() => {
    fetchBlogs();
  }, [location]);

  const handleBlogClick = (blog) => {
    navigate(`/blog/${blog._id}`);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      navigate("/student-login");
    }
  };

  return (
    <div className="blogs-page">
      <header className="dashboard-header">
        <h1>BlogsApp</h1>
        <nav className="nav-menu">
          <a href="/Blogs-Home">All Blogs</a>
          <a href="/my-blogs">My Blogs</a>
          <a href="/add-blog">Add Blog</a>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      <div className="blog-list">
        <h2>All Blogs</h2>
        <div className="blog-container">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <div className="blog-header">
                  <div className="author-avatar"></div>
                  <h3>{blog.title}</h3>
                </div>
                <img
                  src={blog.image || "https://via.placeholder.com/400x200"}
                  alt={blog.title}
                  className="blog-image"
                />
                <p className="blog-desc">{blog.content}</p>
                <button onClick={() => handleBlogClick(blog)}>Read More</button>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsHome;












