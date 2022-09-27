import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, FormControl } from "react-bootstrap";
import AdminPopup from "./adminPopup";
import AdminSearchResult from "./adminUserSearchResult";
import axios from 'axios';
import UserDetails from "./adminUserDetails";

export default function AdminSearchAction() {
    const [searchInput, setSearchInput] = useState();
    const [searchData, setSearchData] = useState();
    const [clickedRow, setClickedRow] = useState();

    function submit() {
        console.log("searchInput:" + searchInput);
        searchUserDetails();
        setSearchInput(undefined);
    }

    function searchUserDetails() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"','').replaceAll('\\','')}`;
        axios.defaults.headers.post['Content-Type'] ='application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';

        let url='http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8083/e-auction/api/v1/admin/user-details';
        if(searchInput!==undefined){
            url=url+'/'+searchInput;
        }
        axios.get(url)
            .then(res => {
                console.log("response=="+res.data);
                setSearchData(res.data);
            })
    }

    const userSearchProperties={
        data:searchData,
        columns:userSearchColumns,
        clickRow: setClickedRow
    }

    const userDetailsProperties={
        data:clickedRow,
        hideUserDetails: setClickedRow,
        refreshGrid:searchUserDetails
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Search User</InputGroup.Text>
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
                <div className="col-md-4">
                    <AdminPopup />
                </div>
            </div>
            <br />
            {(searchData!==undefined)?<AdminSearchResult data={userSearchProperties} />:<div></div>}
            <br />
            {(clickedRow!==undefined)?<UserDetails data={userDetailsProperties} />:<div></div>}
        </div>
    );
}

const userSearchColumns = [
{
    dataField: 'firstName',
    text: 'First Name',
    sort: true
},
{
    dataField: 'lastName',
    text: 'Last Name',
    sort: true
},   
{
    dataField: 'address',
    text: 'Address',
    sort: true
},
{
    dataField: 'city',
    text: 'City',
    sort: true
},{
    dataField: 'state',
    text: 'State',
    sort: true
},
{
    dataField: 'pin',
    text: 'Pin',
    sort: true
},   
{
    dataField: 'phone',
    text: 'Phone',
    sort: true
},
{
    dataField: 'email',
    text: 'Email',
    sort: true
},{
    dataField: 'userType',
    text: 'User Type',
    sort: true
},
{
    dataField: 'status',
    text: 'Status',
    sort: true
},

];