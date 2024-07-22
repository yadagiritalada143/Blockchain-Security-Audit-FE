import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileImage from "../assets/profile.jpg";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Popover, OverlayTrigger } from "react-bootstrap";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState({ firstName: "", lastName: "" });

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const getUser = async () => {
    try {
      const { data } = await axios(
        `/common/getUserDetails/${localStorage.getItem("email")}`
      );
      setName({ firstName: data.user.firstName, lastName: data.user.lastName });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">
          Blockchain
        </a>

        <div className="d-flex ms-auto align-items-center">
          <span className="text-white me-4">
            Hello, {name.firstName} {name.lastName}
          </span>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={
              <Popover className="bg-dark">
                <Popover.Body className="text-white">
                  View/Edit Profile
                </Popover.Body>
              </Popover>
            }
          >
            <img
              src={ProfileImage}
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={goToProfile}
            />
          </OverlayTrigger>

          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
