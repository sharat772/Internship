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
import { loadTransactions, deleteTransaction } from "./redux/actions";
import { toast, ToastContainer } from "react-toastify";
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
  }, [msg, dispatch]);

  // State for the modal
  const [showModal, setShowModal] = useState(false);

  // State for the list of products
  const [products, setProducts] = useState([]);

  // State for the list of services
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  // State for the selected type
  const [selectedType, setSelectedType] = useState("");

  // State for the selected product
  const [selectedProduct, setSelectedProduct] = useState("");

  // State for the selected service
  const [selectedService, setSelectedService] = useState("");
  const [transactionId, setTransactionId] = useState("");
  // State for the form fields
  const [quantity, setQuantity] = useState("");
  const [price, setSelectedItemPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");
const[customer_name, setSelectedCustomer]=useState("");
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

      axios
      .get(`${API}/customers`)
      .then((response) => {
        console.log(response.data); // check if data is fetched correctly
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));

      generateTransactionId();

      getCurrentDate();


  }, []);

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
      price: price * quantity,
    };

    // Call the API to create the new transaction
    axios
      .post(`${API}/transactions`, newTransaction)
      .then((response) => {
        console.log("Transaction created:", response.data);
        setShowModal(false);
        dispatch(loadTransactions());
        toast.success("Transaction Added successfully");
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
  };

  const handleProductChange = (event) => {
    const selectedItemId = event.target.value;
    setSelectedProduct(selectedItemId);

    if (selectedType === "product") {
      const selectedProduct = products.find(
        (product) => product.name === selectedItemId
      );
      if (selectedProduct) {
        setSelectedItemPrice(selectedProduct.sprice);
      }
    } else if (selectedType === "service") {
      const selectedService = services.find(
        (service) => service.name === selectedItemId
      );
      if (selectedService) {
        setSelectedItemPrice(selectedService.cost);
        setQuantity(1);
      }
    }
  };

  const generateTransactionId = () => {
    const randomId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    setTransactionId(randomId.toString()); // Convert the random number to a string and set it as the transaction ID
  };

  const getCurrentDate = () => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
    setTransactionDate(currentDate); // Set the current date as the transaction date
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete ")) {
      dispatch(deleteTransaction(id));
      dispatch(loadTransactions());
    }
  };

  const handleBillClick = () => {
    let total = 0;
    transactions.forEach((transaction) => {
      total += transaction.price;
    });
    setTotalPrice(total);

    const newQuotation = {
      customer_name : customer_name,
      transactionId:transactionId,
      transactionDate: transactionDate,
      items:transactions,
      total:total,
    };

    axios
      .post(`${API}/quotation`, newQuotation)
      .then((response) => {
        console.log("Quotation created:", response.data);
        toast.success("Quotation Added successfully");
      })
      .catch((error) => {
        console.error("Error creating Quotation:", error);
      });


  };

  return (
    <>
      <ToastContainer />
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
        <br></br>
        <Container>
          <div>
          <Form.Group>
                  <Form.Label>Customer</Form.Label>
                  <Form.Control as="select"  onChange={(event) => setSelectedCustomer(event.target.value)}>
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer._id} value={customer._id}>
                        {customer.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Transaction ID</Form.Label>
                  <Form.Control type="text" readOnly value={transactionId} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Transaction Date</Form.Label>
                  <Form.Control type="date" value={transactionDate} readOnly />
                </Form.Group>
          </div>
          <div>
            <h2>
              <Badge bg="secondary">Transactions</Badge>
            </h2>
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
                  <Form.Label>Type</Form.Label>
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
                        onChange={handleProductChange}
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
                        value={selectedProduct}
                        onChange={handleProductChange}
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
                  <Form.Control type="number" value={price} readOnly />
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
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Type</th>
                  <th>Product / Service</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(transactions) &&
                  transactions.map((transaction, index) => (
                    <tr key={transaction._id}>
                      <td>{index + 1}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.product || transaction.service}</td>
                      <td>{transaction.quantity}</td>
                      <td>{transaction.price}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            style={{ marginRight: "5px" }}
                            variant="danger"
                            onClick={() => handleDelete(transaction._id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>

          <Row>
            <Col md={{ span: 4, offset: 8 }}>
              <Button variant="success" onClick={handleBillClick}>
                Total Bill
              </Button>
              {totalPrice > 0 && (
                <div className="mt-4">
                  <h5>Total Transactions Price: {totalPrice}</h5>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TransactionsPage;
