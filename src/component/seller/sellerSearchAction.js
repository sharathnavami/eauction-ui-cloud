import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, FormControl } from "react-bootstrap";
import SellerSearchResult from "./sellerSearchResult";
import SellerAddPopup from "./sellerAddPopup";
import axios from 'axios';
import SellerBidSearchResult from "./SellerBidResult";

export default function SellersearchAction() {

    const [searchInput, setSearchInput] = useState();
    const [searchData, setSearchData] = useState();
    const [selectRow, setSelectRow] = useState();
    const [enableDelete, setEnableDelete] = useState();

    const update= row =>{
        setSelectRow(row);
        console.log(row)
        if(row.bid?.length===0){
            console.log("empty row");
            setEnableDelete(true)
        }else{
            setEnableDelete(false)
        }
        console.log(enableDelete)
    }

    const bidproperties = {
        data: selectRow,
        columns: bidcolumns,
        validation:enableDelete,
        refreshGrid: componentDidMount
    }

    function submit() {
        console.log("searchInput:" + searchInput);
        setSearchData(undefined)
        setSelectRow(undefined);
        setEnableDelete(false);
        componentDidMount();
    }

    const properties = {
        data: searchData,
        columns: columns,
        updateBid:update,
    }

    function componentDidMount() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"','').replaceAll('\\','')}`;
        axios.defaults.headers.post['Content-Type'] ='application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';

        let url='http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8081/e-auction/api/v1/seller/show-bids/name';
        if(searchInput!==undefined){
            url=url+'/'+searchInput;
        }
        axios.get(url)
            .then(res => {
                console.log("response=="+res.data);
                setSearchData(res.data);
            })
    }

    return (
        <div>
            <div class="row">
                <div class="col">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Product Name</InputGroup.Text>
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
                <div class="col">
                    <SellerAddPopup></SellerAddPopup>
                </div>
            </div>
            {(searchData!==undefined)?<SellerSearchResult data={properties}></SellerSearchResult>:<div></div>}

            {(selectRow!==undefined)?<SellerBidSearchResult data={bidproperties}></SellerBidSearchResult>:<div></div>} 
            
        </div>
    );
}

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true
},
{
    dataField: 'category',
    text: 'Category',
    sort: true
},
{
    dataField: 'description',
    text: 'Description',
    sort: true
},
{
    dataField: 'detailDesc',
    text: 'Detail Description',
    sort: true
},
{
    dataField: 'endDate',
    text: 'End Date',
    sort: true
},
{
    dataField: 'name',
    text: 'Name',
    sort: true
},
{
    dataField: 'sellerEmailId',
    text: 'Email',
    sort: true
},
{
    dataField: 'startingPrice',
    text: 'Starting Price',
    sort: true
}
];


const bidcolumns = [
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

];