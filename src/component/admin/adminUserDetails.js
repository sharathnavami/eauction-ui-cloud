import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';


export default function UserDetails(props) {
    console.log(props)

    const [errorMessage, setErrorMessage] = useState();
    const [open, setOpen] = React.useState(false);
    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
    };

    function activate(){
        activateUser();
    }

    function deregister(){
        deRegisterUser();
    }


    function activateUser() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        axios.put(`http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8083/e-auction/api/v1/admin/activate/${props.data.data?.email}`)
            .then(response => {
                console.log("response==" + response);
                setErrorMessage("User Activated Successfully");
                setOpen(true);
                props.data.hideUserDetails();
                props.data.refreshGrid();
            })
            .catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                console.warn("error", message);
                setErrorMessage(err.response.data);
                setOpen(true);
            });
    }

    function deRegisterUser() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        axios.put(`http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8083/e-auction/api/v1/admin/deregister/${props.data.data?.email}`)
            .then(response => {
                console.log("response==" + response);
                setErrorMessage("User Deregister Successfully");
                setOpen(true);
                props.data.hideUserDetails();
                props.data.refreshGrid();
                })
            .catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                console.warn("error", message);
                setErrorMessage(err.response.data);
                setOpen(true);
            });
    }

    return (
        <div>
            <h4>User Details:</h4>
            <div class="row">
                <div class="col-md-6">
                    <div class="container bg-light justify-content-start">
                        <div class="row">
                            <div class="col-md-4">
                                First Name
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.firstName}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                Last Name
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.lastName}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                Address
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.address}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                City
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.city}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                State
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.state}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                PIN
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.pin}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                Phone
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.phone}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                Email
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.email}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                Status
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.status}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                Role
                            </div>
                            <div class="col-md-4">
                                : {props.data.data?.userType}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">

                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    {(props.data.data?.status === 'N') ? <div><br /><Button variant="primary" onClick={activate}>Activate</Button></div> :
                        <div><Button variant="primary" onClick={deregister}>Deregister</Button></div>
                    }
                </div>
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
    );
}