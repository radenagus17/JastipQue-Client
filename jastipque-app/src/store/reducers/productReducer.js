import {
  GET_PRODUCTS,
  SET_LOADING,
  SET_ERROR,
  SET_PRODUCT,
  GET_EVENTS,
  SET_LOADING_EVENTS,
  GET_ORDERS,
  SET_ERROR_ORDERS,
  SET_LOADING_ORDERS,
  GET_ORDERS_HEADER,
  SET_LOADING_ORDERS_HEADER,
  SET_ERROR_ORDERS_HEADER,
} from "../actionTypes";

const initial_state = {
  products: [],
  productsLoading: true,
  detailLoading: true,
  productsError: {},
  product: {},
  events: [],
  eventsLoading: true,
  eventsError: {},
  orders: [],
  ordersLoading: true,
  ordersError: {},
  ordersHeader: [],
  ordersHeaderLoading: true,
};

export default function productsReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.payload };
    case SET_PRODUCT:
      return { ...state, product: action.payload };
    case SET_LOADING_EVENTS:
      return { ...state, eventsLoading: action.payload };
    case GET_ORDERS:
      return { ...state, orders: action.payload };
    case GET_ORDERS_HEADER:
      return { ...state, ordersHeader: action.payload };
    case SET_LOADING_ORDERS_HEADER:
      return { ...state, ordersHeaderLoading: action.payload };
    case SET_LOADING_ORDERS:
      return { ...state, ordersLoading: action.payload };
    case SET_LOADING:
      return { ...state, productsLoading: action.payload };
    case SET_ERROR:
      return { ...state, eventsError: action.payload };
    default:
      return state;
  }
}
