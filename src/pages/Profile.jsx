import "../css/Profile.css";
import logo from "../assets/visitjordan logo.png";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
           <img  src={logo} alt="Visit Jordan" className="pro-logo" />
          <div>
            <h2>Esraa Tanbour</h2>
            <p>@esraa</p>
          </div>
        </div>

        <div className="profile-info " >
          <div>
            <label>First Name</label>
            <p>Esraa</p>
          </div>

          <div>
            <label>Last Name</label>
            <p>Tanbour</p>
          </div>

          <div>
            <label>Email</label>
            <p>esraa@example.com</p>
          </div>

          <div>
            <label>Phone Number</label>
            <p>0790000000</p>
          </div>

          <div>
            <label>Username</label>
            <p>esraa</p>
          </div>

          <div>
            <label>Account Type</label>
            <p>Experience Provider</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;