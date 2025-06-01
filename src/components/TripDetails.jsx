import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router-dom";
import api from "../apiFacade.js";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState({});
  const loggedIn = useOutletContext();

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    if (api.hasUserAccess("user", loggedIn)) {
      const fun = async () => {
        setTripDetails(await fetchTripDetails(id));
      };
      fun();
    }
  }, [loggedIn, id]); // Runs on mount and when loggedIn changes (And React wants id to be added)

  if (!api.hasUserAccess("user", loggedIn)) {
    return (
      <>
        <h2>Log in as user to see trip details</h2>
      </>
    );
  }

  return (
    <>
      <h2>{tripDetails.name}</h2>
      {JSON.stringify(tripDetails)}
    </>
  );
}

async function fetchTripDetails(id) {
  const response = await fetch(
    "https://tripapi.cphbusinessapps.dk/api/trips/" + id,
    api.makeOptions("GET", true)
  );
  const tripDetails = await response.json();
  console.log(tripDetails);

  return tripDetails;
}
