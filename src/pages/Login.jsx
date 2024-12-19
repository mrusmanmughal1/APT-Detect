import React, { useState } from "react";
import "./Login.css";
import { useLogin } from "../Hooks/useLogin";
import logo from "../assets/logo.png";
const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { mutate, isPending } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return null;
    mutate({ email, password });
  };

  return (
    <div className="body">
      <div className="container">
        <div className="w-[300px] h-auto overflow-hidden ">
          <img src={logo} className="w-full h-full object-contain" />
        </div>
        <div className="login-form">
          <h1>Hi!</h1>
          <p>LOGIN TO CONTINUE</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email / Username"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                disabled={isPending}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              {isPending ? (
                <div className="center">
                  <div className="loader"></div>{" "}
                </div>
              ) : (
                "LOGIN"
              )}
            </button>
            <div className="forgot-password">
              <a href="#">FORGOT PASSWORD ?</a>
            </div>
            {/* <div className="divider">OR</div>
            <button type="button" className="google-btn">
              <img src="/api/placeholder/20/20" alt="Google Logo" />
              Continue With Google
            </button> */}
            <div className="signup-link">
              DON'T HAVE AN ACCOUNT? <a href="/signup">REGISTER</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
