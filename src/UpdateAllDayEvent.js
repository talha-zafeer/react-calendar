import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdateAllDayEvent = ({ show, close, event, isUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await fetch("/events/updateAllDayEvent", {
        method: "PUT",
        body: JSON.stringify({
          id: event._id,
          title,
          location,
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

    const id = event._id;
    const endpoint = `/events/deleteAllDayEvent/${id}`;

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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          {!isPending && (
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
          {isPending && (
            <Button variant="primary" disabled>
              Saving Changes ...
            </Button>
          )}
          {!isPending && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {isPending && (
            <Button variant="danger" disabled>
              Deleting ...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateAllDayEvent;
