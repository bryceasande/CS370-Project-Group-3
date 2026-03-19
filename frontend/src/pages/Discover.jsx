import { useState } from "react";
import students from "../data/students";

export default function Discover() {
  const [sentRequests, setSentRequests] = useState([]);

  function handleAddFriend(id) {
    if (!sentRequests.includes(id)) {
      setSentRequests([...sentRequests, id]);
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Discover Students</h2>

      {students.map((student) => (
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
      ))}
    </div>
  );
}