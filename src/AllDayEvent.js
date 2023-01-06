const AllDayEvent = ({ event }) => {
  console.log(event);

  return (
    <div className="event-all-day">
      <p>All Day</p>
      <h5>{event.title}</h5>
      <span>{event.location}</span>
    </div>
  );
};

export default AllDayEvent;
