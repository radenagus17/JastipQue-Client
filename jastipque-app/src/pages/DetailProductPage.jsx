import { Link, useHistory, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailProduct } from "../store/actions/productsAction";
import { Rings } from "react-loader-spinner";
import { postOrder } from "../store/actions/ordersAction";

export default function DetailProducts(props) {
  const { product, productsLoading } = useSelector(
    (state) => state.productsReducer
  );
  const { id } = useParams();

  const [Orders, SetOrders] = useState({
    ProductId: id,
    quantity: "",
    note: "",
  });

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(detailProduct(id));
  }, []);

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

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(postOrder(Orders));
    history.push(`/orders`)
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    SetOrders({ ...Orders, [name]: value });
  };

  return (
    <>
      {productsLoading ? (
        <div id="preloader">
          <div id="status">
            <div className="spinner">
              <Rings
                className="double-bounce1"
                ariaLabel="loading-indicator"
                color="blue"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Nav />
          <section
            className="bg-half page-next-level"
            style={{
              background: `url(${product.imageUrl})`,
              margin: -50
            }}
          >
            <div className="bg-overlay"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="text-center text-white">
                    <h4 className="text-uppercase title mb-4">
                      Product Detail
                    </h4>
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
                          Products Detail
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
                <div className="col-lg-12">
                  <h4 className="text-dark mb-3">{product.name}</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 col-md-7">
                  <div className="job-detail border rounded p-4">
                    <div className="job-detail-content">
                      <img
                        src={product.imageUrl}
                        alt="iamge"
                        className="img-fluid float-left mr-md-3 mr-2 mx-auto d-block"
                        width={200}
                      />
                      <div className="job-detail-com-desc overflow-hidden d-block">
                        <h4 className="mb-2">
                          <a href="#" className="text-dark">
                            {product.name}
                          </a>
                        </h4>
                        <p className="text-muted mb-0">
                          <i className="mdi mdi-link-variant mr-2"></i>
                          {product.Store.name}
                        </p>
                        <p className="text-muted mb-3">
                          <i className="mdi mdi-map-marker mr-2"></i>
                          {product.Event.address}
                        </p>
                      </div>
                    </div>

                    <div className="job-detail-desc mt-4">
                      <p className="text-muted mb-0">
                        <i className="mdi mdi-credit-card-plus text-muted"> </i>
                        Price : {convertToRupiah(product.price)},-
                      </p>
                      <p className="text-muted">
                        <i className="mdi mdi-package text-muted"> </i>
                        Stock : {product.stock}
                      </p>
                      <p className="text-muted mb-0">{product.description}</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-5 mt-4 mt-sm-0">
                  <div className="job-detail border rounded p-4">
                    <h5 className="text-muted text-center pb-2">
                      <i className="mdi mdi-calendar-range mr-2"></i>On Events
                    </h5>

                    <div className="job-detail-location pt-4 border-top">
                      <div className="job-details-desc-item">
                        <div className="float-left mr-2">
                          <i className="mdi mdi-bank text-muted"></i>
                        </div>
                        <p className="text-muted mb-2">
                          : {product.Event.name}
                        </p>
                      </div>

                      <div className="job-details-desc-item">
                        <div className="float-left mr-2">
                          <i className="mdi mdi-map-marker text-muted"></i>
                        </div>
                        <p className="text-muted mb-2">
                          : {product.Event.address}
                        </p>
                      </div>

                      <div className="job-details-desc-item">
                        <div className="float-left mr-2">
                          <i className="mdi mdi-clock-in text-muted"></i>
                        </div>
                        <p className="text-muted mb-2">
                          {" "}
                          Start : {product.Event.start.slice(0, 10)}
                        </p>
                      </div>

                      <div className="job-details-desc-item">
                        <div className="float-left mr-2">
                          <i className="mdi mdi-close text-muted"></i>
                        </div>
                        <p className="text-muted mb-2">
                          {" "}
                          End : {product.Event.finish.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleOrder}>
                    <div className="job-detail border rounded mt-4 p-4">
                      <h5 className="text-muted text-center pb-2">
                        <i className="mdi mdi-shopping mr-2"></i>Order Product
                      </h5>
                      <div className="job-detail-time border-top pt-4">
                        <ul className="list-inline mb-0">
                          <li className="clearfix text-muted border-bottom pb-3">
                            <div className="float-left">Quantity</div>
                            <div className="float-right">
                              <input
                                className="form-control"
                                type="number"
                                name="quantity"
                                placeholder="total buy"
                                value={Orders.quantity}
                                onChange={(e) => handleOnChange(e)}
                              />
                            </div>
                          </li>

                          <li className="clearfix text-muted border-bottom pb-3">
                            <div className="float-left">Note</div>
                            <div className="float-right">
                              <textarea
                                className="form-control"
                                placeholder="optional"
                                type="number"
                                name="note"
                                value={Orders.note}
                                onChange={(e) => handleOnChange(e)}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="job-detail border rounded mt-4">
                      <button
                        className="btn btn-primary btn-block"
                        // onClick={() => handleOrder}
                      >
                        Buy Products
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
