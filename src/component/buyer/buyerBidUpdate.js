import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { Snackbar } from "@material-ui/core";

export default function BuyerBidUpdate(props) {
    console.log(props);
    const [updatedBidAmount, setUpdatedBidAmount] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [open, setOpen] = React.useState(false);
    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
    };

    function submit() {
        console.log("updatedBidAmount:" + updatedBidAmount);
        if(updatedBidAmount<props.data.selectRow?.startingPrice){
            setErrorMessage("Amount should be greater than Starting price")
            setOpen(true);
        }else{
            updateBidAmount();
            }
        }
    function close() {
        props.data.updateRow(undefined);
    }

    function updateBidAmount() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        axios.put(`http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8082/e-auction/api/v1/buyer/update-bid/${props.data.selectRow.productId}/${props.data.selectRow.buyerEmail}/${updatedBidAmount}`)
            .then(res => { 
                console.log(res);
                props.data?.refreshSearch();
                setErrorMessage("Updated Bid successfully");
                setOpen(true);
                close();

            })
            .catch(err => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.error);
                console.log(errorMessage);
                setOpen(true);
            })
    }

    return (
        <div>
            <h3>Update bid Amount for product: {props.data?.productName}</h3>
            <div className="row">
                <div className="col-md-6">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Current Bid : {props.data.selectRow?.amount}</InputGroup.Text>
                        <InputGroup.Text id="inputGroup-sizing-default">Enter New Bid Amount : </InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={e => setUpdatedBidAmount(e.target.value)}
                        />
                        <Button variant="primary" onClick={submit}>
                            Update
                        </Button>
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
                    </InputGroup>
                </div>
                <div className="col-md-3">
                    <Button variant="primary" onClick={close}>
                        Close
                    </Button>
                </div>
            </div>

        </div>
    );
}