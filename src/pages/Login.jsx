import React, { useState } from "react";
import "./Login.css";
import { useLogin } from "../Hooks/useLogin";

const LoginPage = () => {
  const [email, setemail] = useState("mrusmanmughal1@gmail.com");
  const [password, setpassword] = useState("99999999");
  const { mutate, isPending } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return null;
    mutate({ email, password });
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
            <circle cx="50" cy="50" r="48" stroke="white" stroke-width="2" />
            <circle cx="30" cy="40" r="8" fill="white" />
            <circle cx="70" cy="40" r="4" fill="white" />
            <circle cx="50" cy="60" r="4" fill="white" />
            <path
              d="M30 70 Q50 80 70 70"
              stroke="white"
              stroke-width="2"
              fill="none"
            />
            <circle cx="80" cy="20" r="2" fill="#00BFFF" />
            <path
              d="M60 30 Q70 20 80 30"
              stroke="#00BFFF"
              stroke-width="2"
              fill="none"
            />
          </svg>
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
