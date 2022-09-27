import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, FormControl } from "react-bootstrap";
import TrendChart from "./trendChart";
import axios from 'axios';

export default function DashboardSearchAction() {

    const [labels, setLabels] = useState();
    const [label, setLabel] = useState();
    const [searchInput, setSearchInput] = useState();
    const [searchData, setSearchData] = useState('');

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "First dataset",
                data: [33, 53, 85, 41, 44, 65],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    const dahsboardProperties = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: searchData,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }

    function submit() {
        console.log("searchInput:" + searchInput);
        getBidDetails();
    }

    function getAllProductDetails() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        let url = 'http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8082/e-auction/api/v1/buyer/show-all-product';
        axios.get(url)
            .then(res => {
                console.log("response==" + JSON.stringify(res.data));
                setSearchData(res.data);
            })
    }

    function getBidDetails() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"', '').replaceAll('\\', '')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        let url = `http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8082/e-auction/api/v1/buyer/dashboard/${searchInput}`;
        axios.get(url)
            .then(res => {
                console.log("response==" + JSON.stringify(res.data));
                setSearchData(res.data?.bids);
                setLabels(res.data?.labels);
                setLabel(`${res.data?.productName} : ${res.data?.productId}`)
            })
    }


    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Search for Product</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={e => setSearchInput(e.target.value)}
                />
                <Button variant="primary" onClick={submit}>
                    Search
                </Button>
            </InputGroup>
            <br />
            <TrendChart data={dahsboardProperties} />
        </div>
    );
}
