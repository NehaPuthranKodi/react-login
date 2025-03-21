import React, { useState } from "react";
import "../styles/main.css";
import { Eye, EyeOff } from "lucide-react";
import coogie from "../assets/images/image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email address is invalid";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must include at least one special character";
    }
    return "";
  };

  //Validate Email And Password onChange
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(newEmail),
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(newPassword),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      console.log("Form submitted successfully");
      toast.success("Form submitted successfully!"); // Display a success toast
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="leftside">
          <span className="quote">A Wise Quote</span>
          <div className="bottom">
            <h1>
              Get <br /> Everything <br /> You Want
            </h1>
            <p>
              You can get everything you want if you work hard, <br /> trust the
              process, and stick to the plan.
            </p>
          </div>
        </div>
        <div className="rightside">
          <div className="logo">
            <img
              src={coogie}
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                marginBottom: "3px",
              }}
              alt="Logo"
            />
            Cogie
          </div>
          <h2>Welcome Back</h2>
          <p>Enter your email and password to access your account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff color="black" strokeWidth={1.25} />
                  ) : (
                    <Eye color="black" strokeWidth={1.25} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="remember-me">
              <span>
                <input type="checkbox" /> Remember me
              </span>
              <a href="#">Forgot Password</a>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
            <button type="button" className="google-login">
              <img
                src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                alt="Google"
                width="35"
              />
              Sign In with Google
            </button>

            <p className="signup-link">
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
