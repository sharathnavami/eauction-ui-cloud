import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";

export default function SellerBidSearchResult(props) {

    const [errorMessage, setErrorMessage] = useState();
    const [open, setOpen] = React.useState(false);
    const handleToClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
      };

    function deleteProduct() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"','').replaceAll('\\','')}`;
        axios.defaults.headers.common['Content-Type'] ='application/json';
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
        axios.delete(`http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8081/e-auction/api/v1/seller/delete/${props.data.data.id}`)
            .then(res => { 
                console.log(res);
                props.data.refreshGrid()
            })
            .catch(err => {
                setErrorMessage(err.response.data);
                console.log(errorMessage);
                setOpen(true);
            })
    }

    console.log(props)
    return (
        <div>
            
            {(props.data.validation) ?
                <div>
                 <h4>No Bid details Available for Product: {props.data.data.name}, Product ID: {props.data.data.id}.</h4>    
                <Button variant="primary" onClick={deleteProduct}>
                    Delete Product
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
                </div>
                :
                <div>
                    <h4>Bid details</h4>
                    <BootstrapTable
                        striped
                        hover
                        keyField='id'
                        data={props.data.data?.bid}
                        columns={props.data?.columns}
                        pagination={paginationFactory()}
                    >
                    </BootstrapTable>
                </div>
            }
            


        </div>
    );
}