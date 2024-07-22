import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  mobileNumber: string;
  userRole: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    userRole: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/common/register", formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="background d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="card-title text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#0e7490" }}
            className="btn  w-100 mt-3"
          >
            Register
          </button>
          <p className="text-muted text-center mt-2">
            Already have an account? <a href="/login">login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
