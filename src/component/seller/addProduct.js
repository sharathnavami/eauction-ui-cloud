import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';

export default function AddProduct(props) {

  const [errorMessage, setErrorMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addProductApi();
    }
  };

  function addProductApi() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
    axios.post('http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8081/e-auction/api/v1/seller/add-product-seller', form,{timeout: 10000})
      .then(response => {
        console.log("response==" + response);
        setErrorMessage("Product Added Successfully");
        setOpen(true);
        props.data();
      })
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data : err.message;
        console.warn(err);
        setErrorMessage(err.response.data);
        setOpen(true);

      });
  }

  return (
    <div >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" onChange={e => setField('name', e.target.value)}
              placeholder="Enter your Product Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide valid Product Name.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="shortDescription">
          <Form.Label>Short Description</Form.Label>
          <Form.Control type="text" onChange={e => setField('description', e.target.value)}
            placeholder="Enter your Short Description" required />
        </Form.Group>
        <Form.Group controlId="detailedDescription">
          <Form.Label>Detailed Description</Form.Label>
          <Form.Control type="text" onChange={e => setField('detailDesc', e.target.value)}
            placeholder="Enter your Detailed Description" required />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            onChange={e => setField('category', e.target.value)}
            placeholder="Select user type" required>
            <option value=""></option>
            <option value="PAINTING">PAINTING</option>
            <option value="SCULPTOR">SCULPTOR</option>
            <option value="ORNAMENT">ORNAMENT</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="startingPrice">
          <Form.Label>Starting Price</Form.Label>
          <Form.Control type="number" onChange={e => setField('startingPrice', e.target.value)}
            placeholder="Enter your Starting Price" required />
        </Form.Group>
        <Form.Group controlId="bidEndDate">
          <Form.Label>Bid End Date</Form.Label>
          <Form.Control type="date" onChange={e => setField('endDate', e.target.value)}
            placeholder="Enter Bid End Date" required />
        </Form.Group>
        <div class="row mt-2">
          <div class="d-flex justify-content-end float-right">
            <Button type="submit">
              Add Product
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