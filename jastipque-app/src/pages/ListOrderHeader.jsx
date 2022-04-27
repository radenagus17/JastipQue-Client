import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import {
  changeStatusOrder,
  getOrdersHeader,
} from "../store/actions/ordersAction";

export default function ListOrderHeader() {
  const { ordersHeader, ordersHeaderLoading } = useSelector(
    (state) => state.productsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersHeader());
  }, [ordersHeader]);

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

  const handleReceived = (e, id) => {
    e.preventDefault();
    dispatch(changeStatusOrder(id));
  };

  return ordersHeaderLoading ? (
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
                <h4 className="text-uppercase title mb-4">List Order Header</h4>
                <ul className="page-next d-inline-block mb-0">
                  <li>
                    <Link to="/" className="text-uppercase font-weight-bold">
                      Home
                    </Link>
                  </li>
                  <li>
                    <span className="text-uppercase text-white font-weight-bold">
                      List Order Header
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title title-line pb-5">List Order Header</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 mt-4 pt-2">
              <div className="row">
                {ordersHeader.map((orderHeader) => {
                  return (
                    <>
                      <div className="col-lg-12 mt-4 pt-2">
                        <div className="job-list-box border rounded">
                          <div className="p-3">
                            <div className="row align-items-center">
                              <div className="col-lg-2">
                                <div className="company-logo-img">
                                  <img
                                    src={orderHeader.Order.Product.imageUrl}
                                    alt=""
                                    className="img-fluid mx-auto d-block"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <div className="job-list-desc">
                                  <h6 className="mb-2">
                                    <a href="#" className="text-dark">
                                      {orderHeader.Order.Product.name}
                                    </a>
                                  </h6>
                                  <ul className="list-inline mb-0">
                                    <li className="list-inline-item mr-3">
                                      <p className="text-muted mb-0">
                                        <i className="mdi mdi-map-marker mr-2"></i>
                                        {orderHeader.address}
                                      </p>
                                    </li>

                                    <li className="list-inline-item">
                                      <p className="text-muted mb-0">
                                        <i className="mdi mdi-credit-card mr-2"></i>
                                        Total Price :{" "}
                                        {convertToRupiah(
                                          orderHeader.costShippings +
                                            orderHeader.Order.Product.price
                                        )}
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3">
                                <div className="job-list-button-sm text-right">
                                  <span className="badge badge-success">
                                    {orderHeader.status}
                                  </span>

                                  <div className="mt-3">
                                    {orderHeader.status ===
                                    "Processed By Seller" ? (
                                      <button
                                        className="btn btn-sm btn-primary"
                                        onClick={(e) =>
                                          handleReceived(e, orderHeader.id)
                                        }
                                      >
                                        Order Received
                                      </button>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
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
  );
}
