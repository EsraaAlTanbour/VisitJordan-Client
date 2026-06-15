import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/provider/ProviderTables.css";

const AddExperience = () => {
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
    const fetchCities = async () => {
      try {
        const res = await api.get("/cities");
        setCities(res.data);
      } catch (error) {
        alert("Failed to load cities");
      }
    };

    fetchCities();
  }, []);

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
      await api.post("/experiences", {
        city_id: formData.city_id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        duration: formData.duration,
        capacity: Number(formData.capacity),
        start_date: formData.start_date,
        end_date: formData.end_date,
        price: Number(formData.price),
        image_url: formData.image_url,
      });

      alert("Experience submitted and waiting for admin approval");

      setFormData({
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
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add experience");
    }
  };

  return (
    <div className="admin-page">
      <h1>Add Experience</h1>

      <form className="content-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Experience title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <select
          name="city_id"
          value={formData.city_id}
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

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration, e.g. 2 hours"
          value={formData.duration}
          onChange={handleChange}
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity / number of people"
          value={formData.capacity}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />

        <button className="approve-btn" type="submit">
          Submit Experience
        </button>
      </form>
    </div>
  );
};

export default AddExperience;