import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

const CreateAllDay = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await fetch("/events/create-all-day-event", {
        method: "POST",
        body: JSON.stringify({
          title,
          location,
        }),
        headers: { "Content-Type": "application/json" },
      });
      navigate("/calendar");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Row className="create-event my-5 py-5">
      <Col></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              placeholder="Seminar, Workshop or Dummy"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Event Location</Form.Label>
            <Form.Control
              placeholder="Lahore , ISB or Karachi"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          {!isPending && (
            <Button variant="dark" type="submit" className="my-3">
              Create
            </Button>
          )}
          {isPending && (
            <Button variant="dark" type="submit" className="my-3">
              Creating Event ...
            </Button>
          )}
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default CreateAllDay;
