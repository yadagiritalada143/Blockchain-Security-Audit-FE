import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar";

interface ProfileData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  userName: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/common/updateProfile", profileData);
      setProfileData((prev) => {
        return { ...prev, password: "" };
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios(
        `/common/getUserDetails/${localStorage.getItem("email")}`
      );
      const {
        email,
        userName,
        firstName,
        lastName,
        mobileNumber,
      }: {
        email: string;
        userName: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
      } = data.user;
      setProfileData({
        email,
        userName,
        firstName,
        lastName,
        mobileNumber,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="mb-4 text-center">Profile</h2>
                <form onSubmit={handleUpdate}>
                  <div className="d-flex justify-content-evenly">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={profileData.mobileNumber}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      onChange={handleChange}
                      value={profileData.userName}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Password" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      id="Password"
                      onChange={handleChange}
                      name="password"
                      value={profileData.password}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      style={{ cursor: "not-allowed" }}
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
