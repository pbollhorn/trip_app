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
        setGuideData(await getGuidesFromAllSources());
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

async function getGuidesFromAllSources() {
  const guidesFromApi = await fetchGuideData();
  const guidesFromValbyTours = getGuidesFromValbyTours();

  console.log([guidesFromApi, guidesFromValbyTours]);
  console.log([...guidesFromApi, ...guidesFromValbyTours]);

  return [...guidesFromApi, ...guidesFromValbyTours];
}

async function fetchGuideData() {
  const response = await fetch(
    "https://tripapi.cphbusinessapps.dk/api/guides",
    api.makeOptions("GET", true)
  );
  const guideData = await response.json();

  return guideData;
}

function getGuidesFromValbyTours() {
  return [
    {
      id: "10",
      firstname: "Egon",
      lastname: "Olsen",
      email: "egon@olsen.dk",
    },
    {
      id: "11",
      firstname: "Benny",
      lastname: "Frandsen",
      email: "benny@frandsen.dk",
    },
    {
      id: "12",
      firstname: "Kjeld",
      lastname: "Jensen",
      email: "kjeld@jensen.dk",
    },
  ];
}
