import "../../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(IoMdEyeOff);
  const navigate = useNavigate();



  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });


      if (res.status === 200 && res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // Update global authenticated state
        
        navigate("/main");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert("Invalid email or password");
      } else if (error.request) {
        console.log(error.request);
        alert("Unable to connect to the server");
      } else {
        console.log("Error", error.message);
        alert("An error occurred");
      }
    }
  };



  const handleShowPassword = () => {
    setShowPassword(showPassword === "password" ? "text" : "password");
    setPasswordIcon(showPassword === "password" ? IoMdEyeOff : IoEye);
  };



  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  return (
    <div className="loginPage">
      <div className="wrapper">
        <form onSubmit={handlelogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type={showPassword}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i  onClick={handleShowPassword}>{passwordIcon}</i>
          </div>
          <div className="remember-forgot">
            <Link to={"/forgotPassword"}>
              <a href="">Forgot Password</a>
            </Link>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </form>
        <button className="login-with-google-btn" onClick={loginwithgoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
