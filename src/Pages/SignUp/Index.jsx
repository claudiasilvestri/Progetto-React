import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../layout/signup.css";
import supabase from "../../supabase/client";
import { Toaster, toast } from 'sonner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

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
    const { email, password } = formData;
    
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error('Error');
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        rememberMe: false,
      });

      toast.success('Registration successful! You can now log in.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
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
            <span>Remember me</span>
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
          </label>
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      <Toaster position="bottom-center" />

      <div className="already-registered">
        <p> Already registered? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;







