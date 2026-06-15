import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../css/Cities.css";
import PageHero from "../components/home/PageHero";
const Cities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/cities");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="cities-page">
     <PageHero
  title="Explore Jordan Cities"
  subtitle="Discover Jordan through its historic cities, local culture, markets, and unforgettable views."
  image="https://images.unsplash.com/photo-1564501049412-61c2a3083791"
/>
      <div className="cities-scroll">
        {cities.map((city, index) => (
          <section className="city-banner" key={city.id}>
            <img src={city.image_url} alt={city.name} />

            <div className={`city-overlay ${index % 2 === 0 ? "left" : "right"}`}>
              <h2>{city.name}</h2>
              <p>{city.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Cities;