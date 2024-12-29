import React from "react";
import { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //   handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div className="registerForm">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter your name"
          required
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
