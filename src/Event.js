import React, { useRef, useEffect, useState } from "react";
import { timeString } from "./helper/convertTime";
import UpdateEvent from "./UpdateEvent";
import { getClassName } from "./helper/getClassName";

const Event = ({ event, setRenderedEvents, isUpdated, startTime, endTime }) => {
  const ref = useRef(null);
  const height = (endTime - startTime) * 100 - 3 + "px";
  const time = timeString(startTime);
  const [show, setShow] = useState(false);
  const [className, setClassName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    const el2 = ref.current;
    setClassName(getClassName(height, event.startAt));
    setRenderedEvents(el2);

    // el2.style.height = height * 100 + "px";
  }, []);

  return (
    <>
      <div
        className={className}
        ref={ref}
        id={event._id}
        style={{ height: `${height}` }}
        onClick={handleShow}
      >
        <p>{time}</p>
        <h5>{event.title}</h5>
        <span>{event.location}</span>
      </div>
      {show && (
        <UpdateEvent
          show={show}
          close={handleClose}
          event={event}
          isUpdated={isUpdated}
        />
      )}
    </>
  );
};

export default Event;
