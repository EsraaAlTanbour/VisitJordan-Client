import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/provider/ProviderTables.css";

const EditExperience = ({ experienceId, setActiveTab }) => {
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    city_id: "",
    location: "",
    duration: "",
    capacity: "",
    start_date: "",
    end_date: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const citiesRes = await api.get("/cities");
      const expRes = await api.get(`/experiences/${experienceId}`);

      setCities(citiesRes.data);

      setFormData({
        title: expRes.data.title || "",
        description: expRes.data.description || "",
        category: expRes.data.category || "",
        city_id: expRes.data.city_id || "",
        location: expRes.data.location || "",
        duration: expRes.data.duration || "",
        capacity: expRes.data.capacity || "",
        start_date: expRes.data.start_date?.slice(0, 10) || "",
        end_date: expRes.data.end_date?.slice(0, 10) || "",
        price: expRes.data.price || "",
        image_url: expRes.data.image_url || "",
      });
    };

    fetchData();
  }, [experienceId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.end_date < formData.start_date) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      await api.put(`/experiences/${experienceId}`, {
        ...formData,
        capacity: Number(formData.capacity),
        price: Number(formData.price),
      });

      alert("Experience updated successfully");
      setActiveTab("experiences");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update experience");
    }
  };

  return (
    <div className="admin-page">
      <h1>Edit Experience</h1>

      <form className="content-form" onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <input name="category" value={formData.category} onChange={handleChange} required />

        <select name="city_id" value={formData.city_id} onChange={handleChange} required>
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>

        <input name="location" value={formData.location} onChange={handleChange} required />
        <input name="duration" value={formData.duration} onChange={handleChange} />
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        <input name="image_url" value={formData.image_url} onChange={handleChange} />

        <button className="approve-btn" type="submit">
          Save Changes
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => setActiveTab("experiences")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditExperience;