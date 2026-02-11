import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../layout/signup.css";
import { supabase } from "../../Supabase/client";
import { Toaster, toast } from "sonner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    rememberMe: false,
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, first_name, last_name } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          first_name,
          last_name,
        },
      },
    });

    if (error) {
      toast.error("Registration error: " + error.message);
      return;
    }

    setSuccessMessage(true);

    setFormData({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      rememberMe: false,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="signup-container">
      {successMessage && (
        <div className="success_message">
          Registration successful!
          <br />
          Redirecting to Home...
        </div>
      )}

      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="remember-me-container">
          <label htmlFor="rememberMe" className="remember-me-label">
            <div className="switch">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </div>
            <span>Remember me</span>
          </label>
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      <Toaster position="bottom-center" />

      <div className="already-registered">
        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;