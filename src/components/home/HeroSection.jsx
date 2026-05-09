import "../../css/HeroSection.css";
import heroVideo from "../../assets/Visit JordanVideo.mp4";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <h1>Discover Jordan</h1>
        <p></p>
        <p></p>
        <br/>
      </div>
    </section>
  )
}

export default HeroSection