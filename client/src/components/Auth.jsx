import React from 'react';
import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };

    props.login(credentials)
      .then ( () => navigate( "/" ) )
      .catch( (err) => {
        if(err.message === "Unauthorized")
          setErrorMessage("Invalid username and/or password");
        else
          setErrorMessage(err.message);
        setShow(true);
      });
  };

  return (
    <Row className="mt-3 vh-100 justify-content-md-center">
      <Col md={4} >
        <h1 className="pb-3">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Alert
                dismissible
                show={show}
                onClose={() => setShow(false)}
                variant="danger">
                {errorMessage}
          </Alert>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              value={username} placeholder="Example: admin"
              onChange={(ev) => setUsername(ev.target.value)}
              required={true}
            />
          </Form.Group>
            <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password} placeholder="Enter the password."
              onChange={(ev) => setPassword(ev.target.value)}
              required={true} minLength={6}
              />
          </Form.Group>
            <Button className="mt-3 btn-black" type="submit">Login</Button>
        </Form>
      </Col>
    </Row>
  )
}

function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button variant="outline-light" className="me-3" onClick={()=> navigate('/login')}>Login</Button>
  )
}
function HomeButton() {
  const navigate = useNavigate();
  return (
    <Button variant="outline-light" className="me-3 ms-3" onClick={()=> navigate('/')}>Home</Button>
  )
}

export { LoginForm, LoginButton, HomeButton };