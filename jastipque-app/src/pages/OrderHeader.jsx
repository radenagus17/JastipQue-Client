import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailProduct } from "../store/actions/productsAction";
import { Rings } from "react-loader-spinner";
import { postOrderHeader } from "../store/actions/ordersAction";

export default function OrderHeader(props) {
  const { product, productsLoading } = useSelector(
    (state) => state.productsReducer
  );
  const orderId = window.location.search.split("?").join("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [OrderHeader, SetOrderHeader] = useState({
    id: orderId,
    ShippingId: "",
    address: "",
  });

  useEffect(() => {
    dispatch(detailProduct(id));
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    SetOrderHeader({ ...OrderHeader, [name]: value });
  };

  const handleOrderHeader = (e) => {
    e.preventDefault();
    dispatch(postOrderHeader(OrderHeader)).then((res) => {
      window.snap.pay(res.transactionToken);
    });
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
              margin: -50,
            }}
          >
            <div className="bg-overlay"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="text-center text-white">
                    <h4 className="text-uppercase title mb-4">
                      Order {product.name}{" "}
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
                      <li>
                        <span className="text-uppercase text-white font-weight-bold">
                          Order Header
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
                  <h4 className="text-dark mb-0">
                    Complete the following data to continue :
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 col-md-7 mt-4">
                  <div className="custom-form rounded border p-4">
                    <div id="message"></div>
                    <form
                      name="contact-form"
                      id="contact-form"
                      onSubmit={handleOrderHeader}
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group app-label">
                            <label className="text-muted">Shipping Order</label>
                            <select
                              name="ShippingId"
                              value={OrderHeader.ShippingId}
                              onChange={(e) => handleOnChange(e)}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option defaultValue value="">
                                --Select Shipping--
                              </option>
                              <option value="1">Si Cepat</option>
                              <option value="2">JNT</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group app-label">
                            <label className="text-muted">Address</label>
                            <textarea
                              name="address"
                              id="comments"
                              rows="5"
                              className="form-control resume"
                              placeholder="Address.."
                              value={OrderHeader.address}
                              onChange={(e) => handleOnChange(e)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            type="submit"
                            id="submit"
                            name="send"
                            className="submitBnt btn btn-primary"
                            value="Continue to Payment"
                          />
                          <div id="simple-msg"></div>
                        </div>
                      </div>
                    </form>
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
