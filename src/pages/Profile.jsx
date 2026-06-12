import "../css/Profile.css";
import logo from "../assets/visitjordan logo.png";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
const { user } = useAuth();

if (!user) {
return <h2>Please login first</h2>;
}

return ( <div className="profile-page"> <div className="profile-card"> <div className="profile-header"> <img src={logo} alt="Visit Jordan" className="pro-logo" />

      <div>
        <h2>
          {user.first_name} {user.last_name}
        </h2>

        <p>{user.email}</p>
      </div>
    </div>

    <div className="profile-info">
      <div>
        <label>First Name</label>
        <p>{user.first_name}</p>
      </div>

      <div>
        <label>Last Name</label>
        <p>{user.last_name}</p>
      </div>

      <div>
        <label>Email</label>
        <p>{user.email}</p>
      </div>

      <div>
        <label>Account Type</label>
        <p>{user.role}</p>
      </div>
    </div>
  </div>
</div>


);
};

export default Profile;
