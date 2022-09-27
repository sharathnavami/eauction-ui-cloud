import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { Snackbar } from "@material-ui/core";

export default function BuyerProductBid(props) {
    console.log(props);
    const [bidAmount, setBidAmount] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [open, setOpen] = React.useState(false);
    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
    };

    function close() {
        props.data.updateBid(undefined);
    }

    function submit() {
        console.log("searchInput:" + bidAmount);
        if(bidAmount<props.data.selectProductRow?.startingPrice){
            setErrorMessage("Amount should be greater than Starting price")
            setOpen(true);
        }else{
            updateBidAmount();
        }
    }

    function updateBidAmount() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        axios.post('http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8082/e-auction/api/v1/buyer/place-bid-buyer', {
            "amount": bidAmount,
            "productId": props.data.selectProductRow?.id,
            "productName": props.data.selectProductRow?.name
        })
            .then(res => { 
                console.log(res) 
                props.data?.refreshSearch();
                setErrorMessage("Added Bid successfully");
                setOpen(true);
                close();
            })
            .catch(err => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
                console.log(errorMessage);
                setOpen(true);
            })
    }

    return (
        <div>
            <h3>Bid for product: {props.data?.name}</h3>
            <div className="row">
                <div className="col-md-6">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Starting Bid : {props.data.selectProductRow?.startingPrice}</InputGroup.Text>
                        <InputGroup.Text id="inputGroup-sizing-default">Enter Bid Amount : </InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={e => setBidAmount(e.target.value)}
                        />
                        <Button variant="primary" onClick={submit}>
                            Submit
                        </Button>
                        <br />
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