import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Trips() {
  const [tripList, setTripList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dateFormatter = new Intl.DateTimeFormat("da-DK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // useEffect
  useEffect(() => {
    const fun = async () => {
      setTripList(await fetchTripData());
      setCategoryList(await fetchCategories());
    };

    fun();
  }, []); // Empty dependency array means this runs once on mount

  function changeCategory(event) {
    setSelectedCategory(event.target.value);
  }

  function filteredTripList(category) {
    if (category === "all") return tripList;

    return tripList.filter((e) => e.category === category);
  }

  return (
    <>
      <h2>Trips</h2>
      {"Select trip category: "}
      <select onChange={changeCategory}>
        <option value="all">all</option>
        {categoryList.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Trip name</th>
            <th>Category</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Price (EUR)</th>
            <th>Duration (days)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTripList(selectedCategory).map((e) => (
            <tr key={e.id}>
              <td><Link to={""+e.id}>{e.tripName}</Link></td>
              <td>{e.category}</td>
              <td>{dateFormatter.format(e.startDate)}</td>
              <td>{dateFormatter.format(e.endDate)}</td>
              <td>{e.price}</td>
              <td>{e.durationInDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

async function fetchTripData() {
  const response = await fetch("https://tripapi.cphbusinessapps.dk/api/trips");
  const data = await response.json();
  console.log(data);

  const tripData = data.map(
    (e) =>
      (e = {
        id: e.id,
        tripName: e.name,
        category: e.category.toLowerCase(),
        startDate: new Date(e.starttime.substring(0, 10)),
        endDate: new Date(e.endtime.substring(0, 10)),
        price: e.price,
        durationInDays:
          (new Date(e.endtime) - new Date(e.starttime)) / 1000 / 60 / 60 / 24,
      })
  );

  return tripData;
}

async function fetchCategories() {
  const response = await fetch(
    "https://packingapi.cphbusinessapps.dk/packinglist/"
  );
  const data = await response.json();
  const categories = data.categories;
  return categories;
}

export default Trips;
