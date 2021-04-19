import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { push } = useHistory();
  const baseURL = "http://localhost:5000/api";

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const loginAttempt = (event) => {
    event.preventDefault();
    axios
      .post(`${baseURL}/login`, credentials)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.payload);
        push("/colors");
      })
      .catch((error) => {
        console.log(error.response);
        setError(error.response);
      });
  };

  const [error, setError] = useState();
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form"></div>
      <form onSubmit={loginAttempt}>
        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          data-testid="username"
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          data-testid="password"
        />
        <button> LogIn!!! </button>
      </form>
      <p data-testid="errorMessage" className="error">
        {error}
      </p>
    </div>
  );
};

export default Login;
