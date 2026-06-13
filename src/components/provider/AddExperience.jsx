import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "../../css/provider/ProviderTables.css";


const AddExperience = () => {
  const { user } = useAuth();
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    city_id: "",
    location: "",
    duration: "",
    max_people: "",
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

    try {
      await api.post("/experiences", {
        provider_id: user.id,
        city_id: formData.city_id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        duration: formData.duration,
        max_people: formData.max_people,
        price: formData.price,
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
        max_people: "",
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
          name="max_people"
          placeholder="Max people"
          value={formData.max_people}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
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