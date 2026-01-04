import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";
import StationMap from "./components/StationMap";

function App() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  const loadStations = async () => {
    try {
      const res = await api.get("/stations");
      setStations(res.data);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    loadStations();
  }, []);

  const filtered = stations.filter((s) =>
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header">
        <h1>Sustainable EV Charging Network</h1>
        <p>Monitor and locate EV charging stations in real time</p>
      </div>

      {/* SEARCH */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={loadStations}>Refresh</button>
      </div>

      {error && <p className="error">Failed to load stations</p>}

      {/* GRID */}
      <div className="station-grid">
        {filtered.map((s) => (
          <div className="station-card" key={s.id}>
            <h3>{s.city}</h3>

            <span
              className={`status ${
                s.status === "Available"
                  ? "available"
                  : s.status === "Busy"
                  ? "busy"
                  : "maintenance"
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>
      <div style={{msrginTop:"40px"}}>
        <StationMap stations={filtered} />
      </div>
    </div>
  );
}

export default App;