import React, { useRef, useEffect } from "react";
import { timeString } from "./helper/convertTime";

const Event = ({ event, setRenderedEvents }) => {
  const ref = useRef(null);
  const height = (event.endAt - event.startAt) * 100 - 3 + "px";
  const time = timeString(event.startAt);

  useEffect(() => {
    const el2 = ref.current;
    setRenderedEvents(el2);

    // el2.style.height = height * 100 + "px";
  }, []);

  return (
    <div
      className="event"
      ref={ref}
      id="container"
      style={{ height: `${height}` }}
    >
      <p>{time}</p>
      <h5>{event.title}</h5>
      <span>{event.location}</span>
    </div>
  );
};

export default Event;
