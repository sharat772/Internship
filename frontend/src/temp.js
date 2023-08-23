import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
  Table,
  Container,
  Row,
  Col,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadTransactions } from "./redux/actions";
import { toast } from "react-toastify";
import axios from "axios";
const API = "http://127.0.0.1:5000";
const TransactionsPage = () => {
    const dispatch = useDispatch();
    const { transactions, msg } = useSelector((state) => state.data);
  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
    dispatch(loadTransactions());
  }, [msg]);
  // State for the modal
  const [showModal, setShowModal] = useState(false);

  // State for the list of products
  const [products, setProducts] = useState([]);

  // State for the list of services
  const [services, setServices] = useState([]);

  // Fetch the products and services when the component mounts
  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then((response) => {
        console.log(response.data); // check if data is fetched correctly
        setProducts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${API}/services`)
      .then((response) => {
        console.log(response.data); // check if data is fetched correctly
        setServices(response.data);
      })
      .catch((error) => console.log(error));
      
  }, []);
  //   console.log(products); // check if state is updated correctly
  //   console.log(services);

  // State for the selected type
  const [selectedType, setSelectedType] = useState("");

  // State for the selected product
  const [selectedProduct, setSelectedProduct] = useState("");

  // State for the selected service
  const [selectedService, setSelectedService] = useState("");

  // State for the form fields
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // Function to handle submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Type:", selectedType);
    console.log("Product:", selectedProduct);
    console.log("Service:", selectedService);
    console.log("Quantity:", quantity);
    console.log("Price:", price);

    // Create a new transaction object
    const newTransaction = {
      type: selectedType,
      product: selectedProduct,
      service: selectedService,
      quantity: quantity,
      price: price,
    };

    // Call the API to create the new transaction
    axios
      .post(`${API}/transactions`, newTransaction)
      .then((response) => {
        console.log("Transaction created:", response.data);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
      dispatch(loadTransactions());
      
  };

  return (
    <div>
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
      <div className="container my-4">
        <h1>Transactions</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Choose Product or Service</Form.Label>
              <Form.Control
                as="select"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                <option value="">Select a type</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </Form.Control>
            </Form.Group>
            {selectedType === "product" && (
              <div>
                <Form.Group>
                  <Form.Label>Choose Product</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedProduct}
                    onChange={(event) => setSelectedProduct(event.target.value)}
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => {
                      return (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </div>
            )}
            {selectedType === "service" && (
              <div>
                <Form.Group>
                  <Form.Label>Choose Service</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedService}
                    onChange={(event) => setSelectedService(event.target.value)}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => {
                      return (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </div>
            )}
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div>
        <Row>
          <Col md={12}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              {Array.isArray(transactions) &&
                transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.product}</td>
                    <td>{transaction.service}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.price}</td>
                  </tr>
                ))}
            </Table>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TransactionsPage;
