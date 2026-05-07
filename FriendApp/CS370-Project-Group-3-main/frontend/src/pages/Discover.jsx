import { useState } from "react";
import students from "../data/students";

// This component displays a list of students and allows sending friend requests
export default function Discover() {
  // State to keep track of which students have been sent a friend request
  const [sentRequests, setSentRequests] = useState([]);

  // Function to handle sending a friend request
  function handleAddFriend(id) {
    // Only add the student if a request hasn't already been sent
    if (!sentRequests.includes(id)) {
      // Update state by adding the new student ID to the array
      setSentRequests([...sentRequests, id]);
    }
  }

  return (
    // Container div for styling and layout
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Discover Students</h2>

      {/* Loop through each student and display their info */}
      {students.map((student) => (
        <div
          key={student.id} // Unique key for React list rendering
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#fff",
          }}
        >
          {/* Display student details */}
          <h3>{student.name}</h3>
          <p><b>Major:</b> {student.major}</p>
          <p><b>Year:</b> {student.year}</p>
          <p><b>Classes:</b> {student.classes}</p>
          <p><b>Interests:</b> {student.interests}</p>
          <p><b>Bio:</b> {student.bio}</p>

          {/* Button to send friend request */}
          <button onClick={() => handleAddFriend(student.id)}>
            {/* Change button text if request already sent */}
            {sentRequests.includes(student.id) ? "Request Sent" : "Add Friend"}
          </button>
        </div>
      ))}
    </div>
  );
}