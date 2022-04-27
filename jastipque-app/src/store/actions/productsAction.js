import {
  GET_PRODUCTS,
  SET_LOADING,
  SET_ERROR,
  SET_PRODUCT,
  GET_EVENTS,
  SET_LOADING_EVENTS,
} from "../actionTypes";

// let url = `http://localhost:3000`;
let url = `https://app-server-jastip.herokuapp.com`;

export function getProducts() {
  return (dispatch) => {
    fetch(`${url}/pub/events`)
      .then((result) => {
        return result.json();
      })
      .then((events) => {
        dispatch({
          type: GET_EVENTS,
          payload: events,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_EVENTS,
          payload: false,
        });
      });
  };
}

export function detailProduct(id) {
  return (dispatch) => {
    fetch(`${url}/pub/products/${id}`)
      .then((result) => result.json())
      .then((product) => {
        dispatch({
          type: SET_PRODUCT,
          payload: product,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      });
  };
}
