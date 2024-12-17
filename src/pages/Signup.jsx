import { useState } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { useSignup } from "../Hooks/useSignup";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signupcall, isPending } = useSignup();
  const [error, setError] = useState(""); // State for error messages

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    // Reset error message
    setError("");

    // Check if all fields are filled
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return false;
    }

    // Email format validation (basic)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Password length validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;
    signupcall(
        { fullName, email, password },
        {
          onSettled: () => reset(),
        })
    // Add signup logic here (e.g., call API)
    // Assuming successful signup, navigate to dashboard
  };

  return (
    <div className="body">
      <div className="container">
        <div className="logo">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="2" />
            <circle cx="30" cy="40" r="8" fill="white" />
            <circle cx="70" cy="40" r="4" fill="white" />
            <circle cx="50" cy="60" r="4" fill="white" />
            <path
              d="M30 70 Q50 80 70 70"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="80" cy="20" r="2" fill="#00BFFF" />
            <path
              d="M60 30 Q70 20 80 30"
              stroke="#00BFFF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="signup-form">
          <h1>Hi!</h1>
          <p>CREATE A NEW ACCOUNT</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            {/* Show error message if validation fails */}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signup-btn">
            {isPending ?
              
              
              <div className="center">
              <div className="loader"></div> </div>: "LOGIN"}
            </button>
            <div className="divider">OR</div>
            <div className="login-link">
              ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
