import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../css/Destinations.css";
import PageHero from "../components/home/PageHero";
const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/destinations");
        setDestinations(res.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="destinations-page">
      <PageHero
  title="Explore Destinations"
  subtitle="Find beautiful places, hidden gems, and local spots across Jordan."
  image="https://i.pinimg.com/736x/7a/2c/26/7a2c26bf80ea2b4fbebee27fd93f4eaa.jpg"
/>

      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div className="destination-card" key={destination.id}>
            <img src={destination.image_url} alt={destination.name} />

            <div className="destination-info">
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;