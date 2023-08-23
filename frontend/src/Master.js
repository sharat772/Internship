import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Modal,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addService,
  addCustomer, // Added new action for adding customer
  loadProducts,
  loadServices,
  deleteProduct,
  deleteService,
} from "./redux/actions";
import { toast, ToastContainer } from "react-toastify";

export const Master = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [sprice, setSprice] = useState(0);
  const [cost, setCost] = useState(0);
  const [mobile, setMobile] = useState(""); // Added mobile state
  const [email, setEmail] = useState(""); // Added email state
  const [address, setAddress] = useState(""); // Added address state
  const { products, msg, services, customers } = useSelector((state) => state.data);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
    dispatch(loadProducts());
    dispatch(loadServices());
  }, [msg]);

  const handleClose = () => setShowModal(false);

  const handleShow = (t) => {
    setType(t);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "product") {
      const newProduct = { name, description, qty, mrp, sprice };
      dispatch(addProduct(newProduct));
      toast.success("Product added successfully");
    } else if (type === "service") {
      const newService = { name, description, cost };
      dispatch(addService(newService));
      toast.success("Service added successfully");
    } else if (type === "customer") { // Handling customer addition
      const newCustomer = {
        name,
        mobile,
        email,
        address
      };
      dispatch(addCustomer(newCustomer));
     
    }
    handleClose();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(id));
      dispatch(loadProducts());
      dispatch(loadServices());
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteService(id));
      dispatch(loadProducts());
      dispatch(loadServices());
      toast.success("Service deleted successfully");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand>ADMIN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Master">Master</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br></br>
      <center>
        <ButtonGroup>
          <Button variant="primary" onClick={() => handleShow("product")}>
            Add Product
          </Button>
          <Button variant="primary" onClick={() => handleShow("service")}>
            Add Service
          </Button>
          <Button variant="primary" onClick={() => handleShow("customer")}>
            Add Customer
          </Button>
        </ButtonGroup>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add {type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${type} name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {type === "product" && (
                <>
                  <Form.Group as={Col} controlId="formGridQty">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter quantity"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridMrp">
                    <Form.Label>MRP</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter MRP"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridSprice">
                    <Form.Label>Selling Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter selling price"
                      value={sprice}
                      onChange={(e) => setSprice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={`Enter ${type} description`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
                </>
              )}

              {type === "service" && (
                <>
                  <Form.Group as={Col} controlId="formGridCost">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter cost"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={`Enter ${type} description`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
                </>
              )}

              {type === "customer" && (
                <>
                  <Form.Group as={Col} controlId="formGridMobile">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}

              

              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </center>
      <Row>
        <h2>
          <Badge bg="secondary">Products</Badge>
        </h2>
        <Col md={12}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>MRP</th>
                <th>Selling Price</th>
                <th>Action</th>
              </tr>
            </thead>
            {Array.isArray(products) &&
              products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.qty}</td>
                  <td>{product.mrp}</td>
                  <td>{product.sprice}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        style={{ marginRight: "5px" }}
                        variant="danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </Table>
        </Col>
      </Row>

      <br></br>
      <br></br>

      <Row>
        <h2>
          <Badge bg="secondary">Services</Badge>
        </h2>
        <Col md={12}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            {Array.isArray(services) &&
              services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.cost}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        style={{ marginRight: "5px" }}
                        variant="danger"
                        onClick={() => handleDeleteService(service._id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Master;
