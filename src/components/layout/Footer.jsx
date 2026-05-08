import "../../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-section">
          <h3>VisitJordan</h3>
          <p>
            Discover Jordan’s culture, cities, experiences,
            and hidden gems.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>

          <a href="/">Home</a>
          <a href="/cities">Cities</a>
          <a href="/experiences">Experiences</a>
          <a href="/blogs">Blogs</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>

          <p>Email: info@visitjordan.com</p>
          <p>Phone: +962 7 7511 3881</p>
          <p>Jordan</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 VisitJordan. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;