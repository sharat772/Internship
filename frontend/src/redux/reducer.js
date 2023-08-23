import * as types from "./actionTypes";

const initialState = {
  customers: [],
  customer: {},
  products: [],
  services: [],
  msg: "",
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case types.ADD_CUSTOMER:
    case types.DELETE_CUSTOMER:
    case types.UPDATE_CUSTOMER:
    case types.DELETE_TRANSACTIONS:
    case types.DELETE_SERVICE:
    case types.DELETE_PRODUCT:
      return {
        ...state,
        msg: action.payload,
      };
    case types.GET_SINGLE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case types.PRODUCT_ADDED:
      return {
        ...state,
        products: action.payload,
      };
    case types.SERVICE_ADDED:
      return {
        ...state,
        services: action.payload,
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case types.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case types.GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
