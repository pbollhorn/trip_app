import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../apiFacade.js";

export default function Guides() {
  const [guideData, setGuideData] = useState([]);
  const loggedIn = useOutletContext();

  // useEffect
  useEffect(() => {
    if (api.hasUserAccess("admin", loggedIn)) {
      const fun = async () => {
        setGuideData(await fetchGuideData());
      };
      fun();
    }
  }, [loggedIn]); // Runs on mount and when loggedIn changes

  if (!api.hasUserAccess("admin", loggedIn)) {
    return <h2>Log in as admin to see guides</h2>;
  }

  return (
    <>
      <h2>Guides</h2>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {guideData.map((e) => (
            <tr key={e.id}>
              <td>{e.firstname}</td>
              <td>{e.lastname}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

async function fetchGuideData() {
  const response = await fetch(
    "https://tripapi.cphbusinessapps.dk/api/guides",
    api.makeOptions("GET", true)
  );
  const guideData = await response.json();
  console.log(guideData);

  return guideData;
}
