import React, { useState } from "react";

const HorseSearch = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://www.globalsportsapi.com/ODATAv1/HorseRacing/horses?gsaappkey=263b99dabbf146038ad53cada07ac76e&$filter=contains(horseName,'${query}')&$top=10&$select=horseName,horseCode`
    );
    const data = await response.json();
    setResult(data.value || []);
    console.log(data);
    console.log(result);
  };

  return (
    <div>
      <h1>Horse Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter horse name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {result.map((horse) => (
          <li key={horse.horseCode}>
            <a
              href={`https://www.timeform.com/horse-racing/profile/horse/${horse.horseCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {horse.horseName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorseSearch;
