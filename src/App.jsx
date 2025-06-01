import "./App.css";
import { useState } from "react";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import api from "./apiFacade.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(api.loggedIn());

  return (
    <div>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={ loggedIn } />
    </div>
  );
}

export default App;
