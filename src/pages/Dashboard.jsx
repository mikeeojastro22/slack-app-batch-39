import React, { useEffect, useState } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { API_URL } from "../constants/Constants";

function Dashboard(props) {
  const { onLogout } = props;
  const { userHeaders } = useData();
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    try {
      // axios.get(url, object that has the headers key - value would be the required headers)

      const requestHeaders = {
        headers: userHeaders
      }
      const response = await axios.get(`${API_URL}/users`, requestHeaders);
      const { data } = response;
      setUserList(data.data);
    } catch (error) {
      if(error) {
        return alert("Cannot get users");
      }
    }
  }

  useEffect(() => {
    if(userList.length === 0) {
      getUsers();
    }
  })

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>
      <p>This is my slack app. Loading of users here...</p>
      <button onClick={onLogout}>Logout</button>

      {
        userList && 
        userList.map((individual) => {
          const { id, email } = individual;
          return (
            <div key={id}>
              <p>ID: {id}</p>
              <p>Email: {email}</p>
            </div>
          )
        })
      }
      {
        !userList && <div>No users available...</div>
      }
    </div>
  );
}

export default Dashboard;
