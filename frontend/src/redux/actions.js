import * as types from "./actionTypes";
import axios from "axios";

const API = "http://127.0.0.1:5000";

const getCustomers = (customers) => ({
  type: types.GET_CUSTOMERS,
  payload: customers,
});

const getCustomer = (customers) => ({
  type: types.GET_SINGLE_CUSTOMER,
  payload: customers,
});

const customerAdded = (msg) => ({
  type: types.ADD_CUSTOMER,
  payload: msg,
});

const customerDelete = (msg) => ({
  type: types.DELETE_CUSTOMER,
  payload: msg,
});

const customerUpdate = (msg) => ({
  type: types.UPDATE_CUSTOMER,
  payload: msg,
});

const productAdded = (msg) => ({
  type: types.PRODUCT_ADDED,
  payload: msg,
});

const getProducts = (products) => ({
  type: types.GET_PRODUCTS,
  payload: products,
});

const serviceAdded = (msg) => ({
  type: types.SERVICE_ADDED,
  payload: msg,
});

const getServices = (services) => ({
  type: types.GET_SERVICES,
  payload: services,
});

const getTransactions = (transactions) => ({
  type: types.GET_TRANSACTIONS,
  payload: transactions,
});

const transactionsDelete = (msg) => ({
  type: types.DELETE_TRANSACTIONS,
  payload: msg,
});

const productDelete = (msg) => ({
  type: types.DELETE_PRODUCT,
  payload: msg,
});

const serviceDelete = (msg) => ({
  type: types.DELETE_SERVICE,
  payload: msg,
});

export const loadCustomers = () => {
  return function (dispatch) {
    axios
      .get(`${API}/customers`)
      .then((resp) => dispatch(getCustomers(resp.data)))
      .catch((err) => console.log(err));
  };
};

export const addCustomer = (customer) => {
  return function (dispatch) {
    axios
      .post(`${API}/customer`, customer)
      .then((resp) => {
        dispatch(customerAdded(resp.data.msg));
        dispatch(loadCustomers());
      })
      .catch((err) => console.log(err));
  };
};

export const deleteCustomers = (id) => {
  return function (dispatch) {
    axios
      .delete(`${API}/customers/${id}`)
      .then((resp) => {
        dispatch(customerDelete(resp.data.msg));
        dispatch(loadCustomers());
      })
      .catch((err) => console.log(err));
  };
};

export const loadSingleCustomers = (id) => {
  return function (dispatch) {
    axios
      .get(`${API}/customer/${id}`)
      .then((resp) => {
        dispatch(getCustomer(resp.data));
      })
      .catch((err) => console.log(err));
  };
};

export const updateCustomers = (customer, id) => {
  return function (dispatch) {
    axios
      .put(`${API}/customer/${id}`, customer)
      .then((resp) => {
        dispatch(customerUpdate(resp.data.msg));
        dispatch(loadCustomers());
      })
      .catch((err) => console.log(err));
  };
};

export const addProduct = (product) => {
  return function (dispatch) {
    axios
      .post(`${API}/product`, product)
      .then((resp) => {
        dispatch(productAdded(resp.data.msg));
        dispatch(loadProducts());
        dispatch(loadServices());
      })
      .catch((err) => console.log(err));
  };
};

export const loadProducts = () => {
  return function (dispatch) {
    axios
      .get(`${API}/products`)
      .then((resp) => dispatch(getProducts(resp.data)))
      .catch((err) => console.log(err));
  };
};

export const addService = (service) => {
  return function (dispatch) {
    axios
      .post(`${API}/service`, service)
      .then((resp) => {
        dispatch(serviceAdded(resp.data.msg));
        dispatch(loadProducts());
        dispatch(loadServices());
      })
      .catch((err) => console.log(err));
  };
};

export const loadServices = () => {
  return function (dispatch) {
    axios
      .get(`${API}/services`)
      .then((resp) => dispatch(getServices(resp.data)))
      .catch((err) => console.log(err));
  };
};

export const loadTransactions = () => {
  return function (dispatch) {
    axios
      .get(`${API}/transactions`)
      .then((resp) => dispatch(getTransactions(resp.data)))
      .catch((err) => console.log(err));
  };
};

export const deleteTransaction = (id) => {
  return function (dispatch) {
    axios
      .delete(`${API}/transactions/${id}`)
      .then((resp) => {
        dispatch(transactionsDelete(resp.data.msg));
        dispatch(loadTransactions());
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProduct = (id) => {
  return function (dispatch) {
    axios
      .delete(`${API}/product/${id}`)
      .then((resp) => {
        dispatch(productDelete(resp.data.msg));
        dispatch(loadProducts());
        dispatch(loadServices());
      })
      .catch((err) => console.log(err));
  };
};

export const deleteService = (id) => {
  return function (dispatch) {
    axios
      .delete(`${API}/service/${id}`)
      .then((resp) => {
        dispatch(serviceDelete(resp.data.msg));
        dispatch(loadProducts());
        dispatch(loadServices());
      })
      .catch((err) => console.log(err));
  };
};
