import { useState } from "react";
import Axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(true);
  //     }
  //   });
  // }, []);

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsernameReg(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(event) => {
            setPasswordReg(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>

      {loginStatus && <button onClick={userAuthenticated}>Check auth</button>}
    </div>
  );
}

export default App;
