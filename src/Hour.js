import Event from "./Event";

const Hour = ({ currentHour, events, setRenderedEvents }) => {
  const eventListTop = [];
  const eventListBot = [];
  events &&
    events.forEach((event) => {
      if (event.startAt == currentHour) {
        eventListTop.push(
          <Event event={event} setRenderedEvents={setRenderedEvents} />
        );
      } else if (Math.floor(event.startAt) == currentHour) {
        eventListBot.push(
          <Event event={event} setRenderedEvents={setRenderedEvents} />
        );
      }
    });

  return (
    <div className="hour">
      <div className="full">{currentHour + ":00"}</div>
      <div className="half">
        <div id={`full-${currentHour}`} className="half-top">
          {eventListTop}
        </div>
        <div className="half-bottom">
          <div className="half-bottom-1">{currentHour + ":30"}</div>
          <div className="half-bottom-2" id={`half-${currentHour}`}>
            {eventListBot}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hour;
