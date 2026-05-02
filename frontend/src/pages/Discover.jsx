import { useMemo, useState } from "react";
import students from "../data/students";

export default function Discover() {
  const [sentRequests, setSentRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("All");
  const [majorFilter, setMajorFilter] = useState("All");

  function handleAddFriend(id) {
    if (!sentRequests.includes(id)) {
      setSentRequests([...sentRequests, id]);
    }
  }

  const majors = useMemo(() => {
    const uniqueMajors = [...new Set(students.map((student) => student.major))];
    return ["All", ...uniqueMajors];
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.interests.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = yearFilter === "All" || student.year === yearFilter;
    const matchesMajor = majorFilter === "All" || student.major === majorFilter;

    return matchesSearch && matchesYear && matchesMajor;
  });

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "0 16px" }}>
      <h2>Discover Students</h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, major, or interests"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: "1", minWidth: "220px" }}
        />

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={{ minWidth: "160px" }}
        >
          <option value="All">All Years</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>

        <select
          value={majorFilter}
          onChange={(e) => setMajorFilter(e.target.value)}
          style={{ minWidth: "180px" }}
        >
          {majors.map((major) => (
            <option key={major} value={major}>
              {major === "All" ? "All Majors" : major}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setYearFilter("All");
            setMajorFilter("All");
          }}
        >
          Clear Filters
        </button>
      </div>

      <p>
        <b>{filteredStudents.length}</b> student
        {filteredStudents.length !== 1 ? "s" : ""} found
      </p>

      {filteredStudents.length === 0 ? (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <p>No students match your search or filters.</p>
        </div>
      ) : (
        filteredStudents.map((student) => (
          <div
            key={student.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#fff",
            }}
          >
            <h3>{student.name}</h3>
            <p><b>Major:</b> {student.major}</p>
            <p><b>Year:</b> {student.year}</p>
            <p><b>Classes:</b> {student.classes}</p>
            <p><b>Interests:</b> {student.interests}</p>
            <p><b>Bio:</b> {student.bio}</p>

            <button onClick={() => handleAddFriend(student.id)}>
              {sentRequests.includes(student.id) ? "Request Sent" : "Add Friend"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}