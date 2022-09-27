import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AdminAddProduct from "./addProduct";
import AddUser from "./addUsers";
import axios from 'axios';

export default function AdminPopup() {
    const [show, setShow] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [sellerEmail, setSellerEmail] = useState([]);
  
    const handleClose = () => {
      setShow(false);
    }
    const handleShow = () => {
      getSellerEmail();
    }
    const handleAddUserClose = () => setAddUser(false);
    const handleAddUserShow = () => setAddUser(true);

    function getSellerEmail() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(localStorage.getItem('token')).replaceAll('"','').replaceAll('\\','')}`;
      axios.defaults.headers.post['Content-Type'] ='application/json';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
      axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
      axios.get('http://eauction-lb-818900349.us-west-2.elb.amazonaws.com:8083/e-auction/api/v1/admin/seller-details')
        .then(response => {
          console.log("response==" + JSON.stringify(response));
          setSellerEmail(response.data);
          setShow(true);
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    }
    const addProductProperties={
      sellerEmail:sellerEmail,
      handleClose:handleClose
    }
  
    return (
      <>
      <div class="row">
      <div class="col-md-4">
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
        </div>
        <div class="col-md-4">
        <Button variant="primary" onClick={handleAddUserShow}>
          Add User
        </Button>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdminAddProduct data={addProductProperties}/>
          </Modal.Body>
        </Modal>


        <Modal
          show={addUser}
          onHide={handleAddUserClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddUser data={handleAddUserClose}/>
          </Modal.Body>
        </Modal>
        </div>
      </>
    );
  }
  