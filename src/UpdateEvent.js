import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import TimeList from "./TimeList";
import { useState } from "react";

const UpdateEvent = ({ show, close, event, isUpdated }) => {
  const time = [];
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startAt);
  const [endTime, setEndTime] = useState(event.endAt);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  for (let i = 0; i < 24; i++) {
    time.push(i);
    time.push(i + 0.5);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startAt = new Date();
    const endAt = new Date();
    if (startTime.includes(".")) {
      startAt.setHours(
        startTime.substring(0, startTime.indexOf(".")),
        "30",
        "00"
      );
    } else {
      startAt.setHours(startTime, "00", "00");
    }
    if (endTime.includes(".")) {
      endAt.setHours(endTime.substring(0, endTime.indexOf(".")), "30", "00");
    } else {
      endAt.setHours(endTime, "00", "00");
    }
    setIsPending(true);
    try {
      await fetch("/events/update", {
        method: "PUT",
        body: JSON.stringify({
          id: event._id,
          title,
          location,
          startAt,
          endAt,
        }),
        headers: { "Content-Type": "application/json" },
      });
      isUpdated();
      close();
      navigate("/calendar");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    setIsPending(true);

    console.log("Deleting ");

    const id = event._id;
    const endpoint = `/events/delete/${id}`;

    fetch(endpoint, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        isUpdated();
        close();
        navigate("/calendar");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                placeholder="Seminar, Workshop or Dummy"
                defaultValue={event.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Event Location</Form.Label>
              <Form.Control
                placeholder="Lahore , ISB or Karachi"
                defaultValue={event.location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Start Time</Form.Label>
                <Form.Select
                  defaultValue={event.startAt}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {time.map((t) => (
                    <TimeList time={t} key={t} />
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>End Time</Form.Label>
                <Form.Select
                  defaultValue={event.endAt}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {time.map((t) => (
                    <TimeList time={t} key={t} />
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          {!isPending && (
            <Button variant="success" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
          {isPending && (
            <Button variant="success" onClick={handleSubmit}>
              Saving Changes ...
            </Button>
          )}
          {!isPending && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {isPending && (
            <Button variant="danger" onClick={handleDelete}>
              Deleting ...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateEvent;
