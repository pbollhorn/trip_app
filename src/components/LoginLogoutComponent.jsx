import React, { useRef } from "react";
import api from "../apiFacade.js";

export default function LoginLogoutComponent({ loggedIn, setLoggedIn }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    api
      .login(usernameRef.current.value, passwordRef.current.value)
      .then(() => {
        localStorage.setItem("currentUsername", usernameRef.current.value);
        setLoggedIn(true);
      })
      .catch(() => {
        alert("Wrong username or password");
        usernameRef.current.value = "";
        passwordRef.current.value = "";
      });
  };

  const handleLogoutSubmit = (e) => {
    e.preventDefault();
    api.logout();
    setLoggedIn(false);
    localStorage.removeItem("currentUsername");
  };

  if (loggedIn === false) {
    return (
      <form onSubmit={handleLoginSubmit}>
        <label>Username: </label>
        <input type="text" ref={usernameRef} />
        <label> Password: </label>
        <input type="password" ref={passwordRef} />{" "}
        <button type="submit">Login</button>
      </form>
    );
  }
  if (loggedIn === true) {
    return (
      <form onSubmit={handleLogoutSubmit}>
        <label>
          Logged in as: {localStorage.getItem("currentUsername") + " "}
        </label>
        <button type="submit">Logout</button>
      </form>
    );
  }
}
