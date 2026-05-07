import { useState } from "react";
import events from "../data/events";

export default function Events() {
  const [rsvps, setRsvps] = useState([]);

  function handleRSVP(id) {
  if (rsvps.includes(id)) {
    setRsvps(rsvps.filter((eventId) => eventId !== id));
  } else {
    setRsvps([...rsvps, id]);
  }
}

  return (
    <div className="events-page">
      <h2>Campus Events</h2>
      <p className="events-subtitle">
        Discover events from student organizations and meet people on campus!
      </p>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h3>{event.title}</h3>
            <p className="event-org">{event.organization}</p>

            <p><b>Date:</b> {event.date}</p>
            <p><b>Time:</b> {event.time}</p>
            <p><b>Location:</b> {event.location}</p>
            <p>{event.description}</p>

            <button onClick={() => handleRSVP(event.id)}>
                {rsvps.includes(event.id) ? "Un-RSVP" : "RSVP"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}