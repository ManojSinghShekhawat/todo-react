import React from "react";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //   handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log(`Error while login`);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div className="registerForm">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
