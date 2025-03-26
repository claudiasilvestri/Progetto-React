import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../layout/signup.css";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Invalid email or password");
    } else {
      setFormData({ email: "", password: "" });
      toast.success("Login successful");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="signin-form">
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

        <button type="submit" className="signup-button">Login now</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default SignIn;







