import React, { useEffect, useState } from "react";
import {
  Navbar,
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomers,
  deleteCustomers,
  loadCustomers,
  loadSingleCustomers,
  updateCustomers,
} from "./redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  id: "",
  qty: "",
  price: "",
};
export const Home = () => {
  const [state, setState] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { customers, msg, customer } = useSelector((state) => state.data);
  const { name, id, qty, price } = state;
  useEffect(() => {
    dispatch(loadCustomers());
  }, []);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
  }, [msg]);

  useEffect(() => {
    if (customer) {
      setState({ ...customer });
    }
  }, [customer]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !id || !qty || !price) {
      toast.error("Fillout Feilds");
    } else {
      if (!editMode) {
        dispatch(addCustomers(state));
        setState({ name: "", id: "", qty: "", price: "" });
      } else {
        dispatch(updateCustomers(state, userId));
        setState({ name: "", id: "", qty: "", price: "" });
        setEditMode(false);
        setUserId(null);
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete ")) {
      dispatch(deleteCustomers(id));
    }
  };

  const handleUpdate = (id) => {
    dispatch(loadSingleCustomers(id));
    setUserId(id);
    setEditMode(true);
  };
  return (
    <>
      <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>Customer Order</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: "70px" }}>
        <Row>
          <center>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  name="id"
                  value={id || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  name="qty"
                  value={qty || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={price || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2 col-md-4">
                <Button type="submit" variant="primary" size="lg" >
                  {editMode ? "Update" : "Submit"}
                </Button>
              </div>
            </Form>
          </Col>
          </center>
          </Row>
          <br></br>
          <Row>
          <Col md={12}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {customers &&
                customers.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.id}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            style={{ marginRight: "5px" }}
                            variant="danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            style={{ marginRight: "5px" }}
                            variant="secondary"
                            onClick={() => handleUpdate(item._id)}
                          >
                            Update
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
