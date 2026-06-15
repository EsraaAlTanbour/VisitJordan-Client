import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../css/Blogs.css";
import PageHero from "../components/home/PageHero";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogs-page">
      <PageHero
  title="Travel Stories & Local Guides"
  subtitle="Discover Jordan through local traditions, food, shopping, culture, and travel tips."
  image="https://images.unsplash.com/photo-1548013146-72479768bada"
/>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image_url} alt={blog.title} />

            <div className="blog-content">
              <span className="blog-tag">VisitJordan Guide</span>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;