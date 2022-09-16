import {
  GET_ORDERS,
  SET_ERROR_ORDERS,
  SET_LOADING_ORDERS,
  GET_ORDERS_HEADER,
  SET_LOADING_ORDERS_HEADER,
  SET_ERROR_ORDERS_HEADER,
} from "../actionTypes";

import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Rings } from "react-loader-spinner";

const MySwal = withReactContent(Swal);

// let url = `http://localhost:3000`;
let url = `https://app-server-jastip.herokuapp.com`;

export function postOrder(data) {
  return (dispatch) => {
    fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        MySwal.fire("Saved!", "Product Created", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function postOrderHeader(data) {
  return async (dispatch) => {
    return fetch(`${url}/order-header/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        ShippingId: data.ShippingId,
        address: data.address,
      }),
    })
      .then((result) => result.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err}`,
        });
      });
  };
}

export default function getOrders() {
  return (dispatch) => {
    fetch(`${url}/orders`, {
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((result) => result.json())
      .then((orders) => {
        dispatch({
          type: GET_ORDERS,
          payload: orders,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: SET_ERROR_ORDERS,
          payload: err,
        });
      })
      .finally((_) => {
        dispatch({
          type: SET_LOADING_ORDERS,
          payload: false,
        });
      });
  };
}

export function getOrdersHeader() {
  return (dispatch) => {
    fetch(`${url}/order-header`, {
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((result) => result.json())
      .then((res) => {
        dispatch({
          type: GET_ORDERS_HEADER,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR_ORDERS_HEADER,
          payload: err,
        });
      })
      .finally((_) => {
        dispatch({
          type: SET_LOADING_ORDERS_HEADER,
          payload: false,
        });
      });
  };
}

export function changeStatusOrder(id) {
  return (dispatch) => {
    fetch(`${url}/order-header/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({
        status: "Order Received",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
