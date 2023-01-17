import { useEffect, useState } from "react";
import { ChevronCompactLeft } from "react-bootstrap-icons";
import AllDayEvent from "./AllDayEvent";
import { alignTasks } from "./helper/alignTasks";
import Hour from "./Hour";

const Calendar = () => {
  const amHours = [];
  const pmHours = [];
  const renderedEvents = [];
  const [events, setEvents] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [flag, setFlag] = useState(false);

  const isUpdated = () => {
    if (flag === true) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };

  async function getEvents() {
    try {
      const result = await fetch("/events", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let { data } = await result.json();
      setEvents(data.events);
      setDayEvents(data.dayEvents);

      setFlag(true);
    } catch (err) {
      console.log("Error ", err);
    }
  }

  // events.sort((a, b) => (a.endAt - a.startAt < b.endAt - b.startAt ? 1 : -1));

  function setRenderedEvents(event) {
    renderedEvents.push(event);
  }

  for (let i = 0; i < 12; i++) {
    amHours.push(i);
    pmHours.push(i + 12);
  }

  useEffect(() => {
    getEvents();
    alignTasks(renderedEvents);
  }, [flag]);

  return (
    <div className="calendar">
      <header>
        <p>
          Friday,<span> </span> April 1
        </p>
      </header>
      <div className="all-day-task">
        {dayEvents &&
          dayEvents.map((event) => (
            <AllDayEvent event={event} isUpdated={isUpdated} key={event._id} />
          ))}
      </div>
      <div className="am">
        <h1>AM</h1>
        <div className="hours">
          {events &&
            amHours.map((hour, index) => (
              <Hour
                currentHour={hour}
                key={index}
                events={events}
                setRenderedEvents={setRenderedEvents}
                isUpdated={isUpdated}
              />
            ))}
        </div>
      </div>
      <div className="pm">
        <h1>PM</h1>
        <div className="hours">
          {events &&
            pmHours.map((hour, index) => (
              <Hour
                currentHour={hour}
                key={index}
                events={events}
                setRenderedEvents={setRenderedEvents}
                isUpdated={isUpdated}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
