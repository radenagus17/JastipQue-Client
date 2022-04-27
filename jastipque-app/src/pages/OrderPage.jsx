import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getOrders from "../store/actions/ordersAction";
import { InfinitySpin } from "react-loader-spinner";

export default function Orders(props) {
  const { orders, ordersLoading } = useSelector(
    (state) => state.productsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [orders]);

  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }

  return (
    <>
      {ordersLoading ? (
        <div className="container">
          <div className="row vertical-center-row">
            <div className="text-center justify-content-center">
              <InfinitySpin color="blue" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Nav />
          <section
            className="bg-half page-next-level"
            style={{
              background: `url(https://images.unsplash.com/photo-1589200348508-adf9bb6e0828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
              margin: -50,
            }}
          >
            <div className="bg-overlay"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="text-center text-white">
                    <h4 className="text-uppercase title mb-4">My Orders</h4>
                    <ul className="page-next d-inline-block mb-0">
                      <li>
                        <Link
                          to="/"
                          className="text-uppercase font-weight-bold"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/#products"
                          className="text-uppercase font-weight-bold"
                        >
                          Events
                        </Link>
                      </li>
                      <li>
                        <span className="text-uppercase text-white font-weight-bold">
                          My Orders
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="row">
                <div className="section-title text-center mb-4 pb-2">
                  <h4 className="title title-line pb-5">My Orders List</h4>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    {orders.map((order) => {
                      return (
                        <>
                          <div
                            className="col-lg-4 col-md-6 mt-4 pt-2"
                            key={order.id}
                          >
                            <div className="list-grid-item rounded">
                              <div className="grid-item-content p-3">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item f-15">
                                    <span className="badge badge-success">
                                      {order.status}
                                    </span>
                                  </li>
                                </ul>
                                <div className="grid-list-img mt-3">
                                  <img
                                    src={order.Product.imageUrl}
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </div>
                                <div className="grid-list-desc mt-3">
                                  <h5 className="mb-1">
                                    <Link
                                      to={{
                                        pathname: `/products/${order.Product.id}`,
                                      }}
                                      className="text-dark"
                                    >
                                      {order.Product.name}
                                    </Link>
                                  </h5>
                                  <p className="text-muted f-14 mb-1">
                                    Order Quantity : {order.quantity}
                                  </p>
                                  <p className="text-muted mb-1">
                                    {convertToRupiah(order.totalPrice)}
                                  </p>
                                  <p className="text-muted mb-1">
                                    {order.note}
                                  </p>
                                </div>
                              </div>
                              <div className="apply-button p-3 border-top">
                                <Link
                                  to={{
                                    pathname: `/order-header/${order.Product.id}`,
                                    search: `${order.id}`,
                                  }}
                                  className="btn btn-primary btn-sm"
                                >
                                  Check Out Now !
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
