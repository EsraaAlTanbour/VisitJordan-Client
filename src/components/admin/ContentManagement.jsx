import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/admin/AdminTables.css";

const ContentManagement = () => {
  const [activeContent, setActiveContent] = useState("cities");

  const [cities, setCities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const citiesRes = await api.get("/cities");
      const destinationsRes = await api.get("/destinations");
      const blogsRes = await api.get("/blogs");

      setCities(citiesRes.data);
      setDestinations(destinationsRes.data);
      setBlogs(blogsRes.data);
    } catch (error) {
      alert("Failed to load content");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({});
    setEditId(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      if (activeContent === "cities") {
        await api.delete(`/cities/${id}`);
      } else if (activeContent === "destinations") {
        await api.delete(`/destinations/${id}`);
      } else {
        await api.delete(`/blogs/${id}`);
      }

      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeContent === "cities") {
        const payload = {
          name: formData.name,
          description: formData.description,
          image_url: formData.image_url,
        };

        editId
          ? await api.put(`/cities/${editId}`, payload)
          : await api.post("/cities", payload);
      }

      if (activeContent === "destinations") {
        const payload = {
          city_id: formData.city_id,
          name: formData.name,
          description: formData.description,
          image_url: formData.image_url,
        };

        editId
          ? await api.put(`/destinations/${editId}`, payload)
          : await api.post("/destinations", payload);
      }

      if (activeContent === "blogs") {
        const user = JSON.parse(localStorage.getItem("user"));

        const payload = {
          admin_id: user?.id,
          title: formData.title,
          content: formData.content,
          image_url: formData.image_url,
        };

        editId
          ? await api.put(`/blogs/${editId}`, payload)
          : await api.post("/blogs", payload);
      }

      resetForm();
      fetchData();
    } catch (error) {
      alert("Save failed");
    }
  };

  const data =
    activeContent === "cities"
      ? cities
      : activeContent === "destinations"
      ? destinations
      : blogs;

  return (
    <div className="admin-page">
      <h1>Content Management</h1>

      <div className="content-tabs">
        <button
          className={activeContent === "cities" ? "active" : ""}
          onClick={() => {
            setActiveContent("cities");
            resetForm();
          }}
        >
          Cities
        </button>

        <button
          className={activeContent === "destinations" ? "active" : ""}
          onClick={() => {
            setActiveContent("destinations");
            resetForm();
          }}
        >
          Destinations
        </button>

        <button
          className={activeContent === "blogs" ? "active" : ""}
          onClick={() => {
            setActiveContent("blogs");
            resetForm();
          }}
        >
          Blogs
        </button>
      </div>

      <form className="content-form" onSubmit={handleSubmit}>
        {activeContent === "blogs" ? (
          <input
            type="text"
            name="title"
            placeholder="Blog title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            type="text"
            name="name"
            placeholder={`${activeContent.slice(0, -1)} name`}
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        )}

        {activeContent === "destinations" && (
          <select
            name="city_id"
            value={formData.city_id || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        )}

        <textarea
          name={activeContent === "blogs" ? "content" : "description"}
          placeholder={activeContent === "blogs" ? "Blog content" : "Description"}
          value={
            activeContent === "blogs"
              ? formData.content || ""
              : formData.description || ""
          }
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url || ""}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button className="approve-btn" type="submit">
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              type="button"
              className="reject-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>{activeContent === "blogs" ? "Title" : "Name"}</th>
              {activeContent === "destinations" && <th>City</th>}
              <th>Description / Content</th>
              {activeContent === "blogs" && <th>Admin</th>}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-cell">
                  No content found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name || item.title}
                        className="table-img"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>{item.name || item.title}</td>

                  {activeContent === "destinations" && (
                    <td>{item.city_name || "-"}</td>
                  )}

                  <td>
                    <span className="small-text">
                      {(item.description || item.content || "").slice(0, 80)}...
                    </span>
                  </td>

                  {activeContent === "blogs" && (
                    <td>
                      {item.admin_first_name} {item.admin_last_name}
                    </td>
                  )}

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;