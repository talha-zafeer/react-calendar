import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      if (data.errors) {
        console.log(data.errors);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        setIsPending(true);
        navigate("/calendar");
      }
      console.log(data);
    } catch (error) {
      console.log("fghfjj", error);
    }
  };
  return (
    <Row className="signup">
      <Col></Col>
      <Col>
        <Form className="my-5 py-5" onSubmit={handleSubmit}>
          <Form.Group className="my-4" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="py-2">{emailError}</div>
          </Form.Group>

          <Form.Group className="my-4" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="py-2">{passwordError}</div>
          </Form.Group>
          {!isPending && (
            <Button variant="dark" type="submit">
              Register
            </Button>
          )}
          {isPending && (
            <Button variant="dark" type="submit" disabled>
              Registering ...
            </Button>
          )}
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default SignUp;
