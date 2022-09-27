import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';

export default function Login(props) {
  const [form, setForm] = useState({})
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  const [errorMessage, setErrorMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form)
    if (!(form.username === undefined || form.username === '' || form.password === undefined || form.password === '')) {
      addProductApi()
    }
  }

  function addProductApi() {
    axios.post('http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8083/e-auction/api/v1/login', form)
      .then(response => {
        localStorage.setItem('user_type', JSON.stringify(response.data.userType).replaceAll('"', ''));
        props.setToken(response.data.token);
      })
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        console.warn(err);
        setErrorMessage(err.response.data);
        setOpen(true);
      });
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setField('username', e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setField('password', e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
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
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}