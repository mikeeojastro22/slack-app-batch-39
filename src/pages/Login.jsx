import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataProvider";

function Login(props) {
  const { onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // react hook for automatically changing the path in the url
  const navigate = useNavigate();
  const { handleHeaders } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add authentication here
    try {
      // try catch
      // try - run the program
      // catch - it catches the error during run time

      // axios.post(url, object that contains the request body)

      const loginCredentials = {
        email,
        password
      }

      const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
      const { data, headers } = response;
      if(data && headers){
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"];
        const client = headers["client"];
        const uid = headers["uid"];

        console.log(data);
        console.log(accessToken, expiry, client, uid);

        // keep the headers value in our context - these can now be used in other pages/components
        handleHeaders(headers);

        onLogin();
        navigate('/dashboard');
      }
    } catch(error) {
      if(error){
        return alert("Invalid credentials");
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
