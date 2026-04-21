import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const name = (item.Name || "").toLowerCase();
      const studentNumber = (item.StudentNumber || "").toLowerCase();

      return (
        name.includes(query.toLowerCase()) ||
        studentNumber.includes(query.toLowerCase())
      );
    });

    setResults(filtered);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Practical Slot Finder</h2>

      <input
        type="text"
        placeholder="Enter name or student number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={handleSearch} style={{ width: "100%", padding: "10px" }}>
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        {results.length === 0 && <p>No results found</p>}

        {results.map((res, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <p><b>Name:</b> {res.Name}</p>
            <p><b>Student Number:</b> {res.StudentNumber}</p>
            <p><b>Slot:</b> {res.Slot}</p>
            <p><b>Lab:</b> {res.Lab}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
