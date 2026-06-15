import React from "react";
import "../../css/PageHero.css";

const PageHero = ({ title, subtitle, image }) => {
  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="page-hero-overlay">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;