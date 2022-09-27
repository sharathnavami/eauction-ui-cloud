import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl } from "react-bootstrap";
import BidProduct from "./bidProduct";
import axios from 'axios';
import BuyerSearchResult from "./buyerSearchResult";
import BuyerPopup from "./buyerPopup";
import BuyerBidUpdate from "./buyerBidUpdate";
import BuyerProductResult from "./buyerProductResult";
import BuyerProductBid from "./buyerProductBid";

export default function BuyerSearchAction() {
    const [selectRow, setSelectRow] = useState();
    const [searchInput, setSearchInput] = useState();
    const [searchData, setSearchData] = useState();
    const [productdata, setProductdata] = useState();
    const [selectProductRow, setSelectProductRow] = useState();

    const update= row =>{
        setSelectRow(row);
    }

    const productUpdate= row =>{
        setSelectProductRow(row);
    }

    function submit() {
        console.log("searchInput:" + searchInput);
        setSearchData(undefined)
        setSelectRow(undefined);
        getBidDetails();
    }

    const properties = {
        data: searchData,
        columns: columns,
        updateBid:update
        
    }

    const productProperties = {
        data: productdata,
        columns: productColumns,
        updateProduct:productUpdate
        
    }
    const productBidUpdateProperties = {
        selectRow: selectRow,
        updateRow: setSelectRow,
        refreshSearch:getBidDetails
    }

    const productBidProperties = {
        selectProductRow:selectProductRow,
        updateBid: setSelectProductRow,
        refreshSearch:getBidDetails
    }

    function getBidDetails() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"','').replaceAll('\\','')}`;
        axios.defaults.headers.post['Content-Type'] ='application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        let url='http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8082/e-auction/api/v1/buyer/show-bids';
        if(searchInput!==undefined){
            url=url+'/'+searchInput;
        }
        axios.get(url)
            .then(res => {
                console.log("response=="+res.data);
                setSearchData(res.data);
            })
    }

    function getProductDetails() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"','').replaceAll('\\','')}`;
        axios.defaults.headers.post['Content-Type'] ='application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
        let url='http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8082/e-auction/api/v1/buyer/show-all-product';
        axios.get(url)
            .then(res => {
                console.log("response=="+JSON.stringify(res.data));
                setProductdata(res.data);
            })
    }
    if(productdata===undefined){
        getProductDetails();
    }
    
    return (
        <div>
            <div class="row">
                <div class="col-md-6">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        <Button variant="primary" onClick={submit}>
                            Search
                        </Button>
                    </InputGroup>
                </div>
            </div>
            <br />
            {(searchData!==undefined)?<BuyerSearchResult data={properties} />:<div></div>}
            <br/>
            {(selectRow!==undefined)?<BuyerBidUpdate data={productBidUpdateProperties}/>:<div></div>}
            <br/>
            {(productdata!==undefined)?<BuyerProductResult data={productProperties}/>:<div></div>}
            <br/>
            {(selectProductRow!==undefined)?<BuyerProductBid data={productBidProperties}/>:<div></div>}
            
        </div>
    );
}

const columns = [
    {
        dataField: 'productId',
        text: 'Product Id',
        sort: true
    },
    {
        dataField: 'productName',
        text: 'Product Name',
        sort: true
    },   
    {
        dataField: 'amount',
        text: 'Amount',
        sort: true
    },
    {
        dataField: 'buyerEmail',
        text: 'Buyer Email',
        sort: true
    },
    {
        dataField: 'productEndDate',
        text: 'Product End Date',
        sort: true
    },
    {
        dataField: 'highestBidAmount',
        text: 'Highest Bid Amount',
        sort: true
    },
    {
        dataField: 'startingPrice',
        text: 'Bid Starting Amount',
        sort: true
    }
    ];

    const productColumns = [
        {
            dataField: 'id',
            text: 'Product Id',
            sort: true
        },
        {
            dataField: 'name',
            text: 'Product Name',
            sort: true
        },   
        {
            dataField: 'description',
            text: 'Description',
            sort: true
        },
        {
            dataField: 'detailDesc',
            text: 'Detail Desc',
            sort: true
        },
        {
            dataField: 'category',
            text: 'Category',
            sort: true
        },
        {
            dataField: 'startingPrice',
            text: 'StartingPrice',
            sort: true
        },
        {
            dataField: 'sellerEmailId',
            text: 'Seller Email',
            sort: true
        }
        ];
    


