import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';

export default function AddUser(props) {

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({})

  const [errorMessage, setErrorMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setValidated(true);
    addUserApi();

  };

  console.log(props);

  function addUserApi() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8083/e-auction/api/v1/admin/addUser', form)
      .then(response => {
        console.log("response==" + response);
        setErrorMessage("User Added Successfully");
        setOpen(true);
        props.data();
      })
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        console.warn("error", message);
        setErrorMessage(err.response.data);
        setOpen(true);
      });
  }

  return (
    <div >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" onChange={e => setField('firstName', e.target.value)}
              placeholder="Enter your first name" required />
            <Form.Control.Feedback type="invalid">
              Please provide valid first name.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" onChange={e => setField('lastName', e.target.value)}
              placeholder="Enter your last name" required />
            <Form.Control.Feedback type="invalid">
              Please provide valid last name.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" onChange={e => setField('address', e.target.value)}
            placeholder="Enter your address" />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" onChange={e => setField('city', e.target.value)}
            placeholder="Enter your city" />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" onChange={e => setField('state', e.target.value)}
            placeholder="Enter your state" />
        </Form.Group>
        <Form.Group controlId="pin">
          <Form.Label>Pin</Form.Label>
          <Form.Control type="number" onChange={e => setField('pin', e.target.value)}
            placeholder="Enter your pin" />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="number" onChange={e => setField('phone', e.target.value)}
              placeholder="Enter your phone" required />
            <Form.Control.Feedback type="invalid">
              Please provide valid phone number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="email" onChange={e => setField('email', e.target.value)}
              placeholder="Enter your email" required />
            <Form.Control.Feedback type="invalid">
              Please provide valid email address.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="userTypemail">
          <Form.Label>Role</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              as="select"
              onChange={e => setField('userType', e.target.value)}
              placeholder="Select user type" required>
              <option value=""></option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select user type.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <div class="row mt-2">
          <div class="d-flex justify-content-end float-right">
            <Button type="submit">
              Add User
            </Button>
          </div>
          <Snackbar
              anchorOrigin={{
                horizontal: "center",
                vertical: "top",
              }}
              open={open}
              autoHideDuration={3000}
              message={errorMessage}
              onClose={handleToClose}
            />
        </div>
      </Form>
    </div>
  );
}