import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import ListEvents from "./pages/ListEvents";
import Register from "./pages/Register";
import DetailProducts from "./pages/DetailProductPage";
import OrderHeader from "./pages/OrderHeader";
import Orders from "./pages/OrderPage";
import Chat from "./pages/Chat";
import ListOrderHeader from "./pages/ListOrderHeader";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ListEvents />
        </Route>

        <Route
          path="/login"
          render={() => {
            if (localStorage.getItem("access_token")) {
              return <Redirect to="/" />;
            } else {
              return <Login />;
            }
          }}
        ></Route>

        <Route
          path="/register"
          render={() => {
            if (localStorage.getItem("access_token")) {
              return <Redirect to="/" />;
            } else {
              return <Register />;
            }
          }}
        ></Route>

        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/list-order-header">
          <ListOrderHeader />
        </Route>
        <Route
          path="/orders"
          render={() => {
            if (localStorage.getItem("access_token")) {
              return <Orders />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        ></Route>

        <Route path="/products/:id">
          <DetailProducts />
        </Route>

        <Route path="/order-header/:id">
          <OrderHeader />
        </Route>
      </Switch>
    </>
  );
}

export default App;
