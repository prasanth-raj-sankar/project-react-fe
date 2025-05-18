import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";

const AddBlog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:4500/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Run once on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new blog or update existing
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get author info from localStorage
    const author = localStorage.getItem("userName");
    if (!author) {
      alert("User not logged in!");
      return;
    }

    const blogData = {
      ...formData,
      author,
    };

    const method = editingBlogId ? "PUT" : "POST";
    const url = editingBlogId
      ? `http://localhost:4500/blogs/${editingBlogId}`
      : "http://localhost:4500/blogs";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(editingBlogId ? "Blog updated!" : "Blog created!");
        setFormData({ title: "", category: "", content: "", image: "" });
        setEditingBlogId(null);
        fetchBlogs();
      } else {
        alert("Error: " + result.msg);
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("An unexpected error occurred.");
    }
  };

  // Populate form for editing a blog
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      content: blog.content,
      image: blog.image || "",
    });
    setEditingBlogId(blog._id);
  };

  // Delete a blog
  const handleDelete = async (id) => {
    const userId = localStorage.getItem("userId");

    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(
          `http://localhost:4500/blogs/${id}?userId=${userId}`,
          {
            method: "DELETE",
          }
        );

        const result = await response.json();

        if (response.ok) {
          alert("Blog deleted!");
          fetchBlogs();
        } else {
          alert("Delete failed: " + result.msg);
        }
      } catch (error) {
        alert("Failed to delete blog.");
        console.error(error);
      }
    }
  };

  // Logout user
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
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </nav>
      </header>

      <div className="add-blog-wrapper">
        <h2>{editingBlogId ? "Edit Your Blog" : "Create a New Blog"}</h2>
        <form className="blog-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Career">Career</option>
            <option value="Finance">Finance</option>
            <option value="Travel">Travel</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />

          <label>Image URL (optional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <button type="submit">
            {editingBlogId ? "Update Blog" : "Add Blog"}
          </button>
        </form>

        <hr />

        <h3>My Blogs</h3>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h4>{blog.title}</h4>
              <p>
                <strong>Category:</strong> {blog.category}
              </p>
              <p>{blog.content}</p>
              {blog.image && <img src={blog.image} alt="Blog" />}
              <div className="card-buttons">
                <button onClick={() => handleEdit(blog)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default AddBlog;




