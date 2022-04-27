import Nav from "../components/Nav";
import ProductsEvents from "../components/ProductsEvents";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/productsAction";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function ListEvents(props) {
  const { events, eventsLoading, eventError } = useSelector(
    (state) => state.productsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      {eventsLoading ? (
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
            className="bg-home"
            style={{
              background: `url(https://images.unsplash.com/photo-1589200348508-adf9bb6e0828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
              margin: -50,
            }}
          >
            <div className="bg-overlay"></div>
            <div className="home-center">
              <div className="home-desc-center">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <div className="title-heading text-center text-white">
                        <h1 className="heading font-weight-bold mb-4">
                          JASTIPQUE
                        </h1>
                        <h6 className="small-title text-light mb-3">
                          JastipQue is a “jasa titip or jastip” application that
                          enables customers to simply pick their favorite items
                          based on the platform’s listing and wait for the
                          “jastip partner” to purchase the items and ship it for
                          them from many major events in Indonesia. JastipQue is
                          easy to use for both customers and jastip partners.
                        </h6>
                      </div>
                    </div>
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
                    <h4 className="title title-line pb-5">EVENTS SCHEDULE</h4>
                    <p className="text-muted para-desc mx-auto mb-1">
                      Fine Event and Get a Products
                    </p>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-9 text-center mt-4 pt-2"></div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="tab-content mt-2" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="recent-job"
                      role="tabpanel"
                      aria-labelledby="recent-job-tab"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          {events.map((event) => {
                            return (
                              <>
                                <div
                                  key={event.id}
                                  className="job-box bg-white overflow-hidden border rounded mt-4 position-relative overflow-hidden"
                                >
                                  <div className="lable text-center pt-2 pb-2 mb-4">
                                    <ul className="list-unstyled best text-white mb-0 text-uppercase">
                                      <li className="list-inline-item">
                                        <i className="mdi mdi-star"></i>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="p-4">
                                    <div className="row align-items-center">
                                      <div className="col-md-2">
                                        <div className="mo-mb-2">
                                          <img
                                            src="images/featured-job/img-1.png"
                                            alt=""
                                            className="img-fluid mx-auto d-block"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-5">
                                        <div>
                                          <h5 className="f-18">
                                            <a href="#" className="text-dark">
                                              {event.name}
                                            </a>
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div>
                                          <p className="text-muted mb-0">
                                            <i className="mdi mdi-map-marker text-primary mr-2"></i>
                                            {event.address}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-3 bg-light">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div>
                                          <p className="text-muted mb-0 mo-mb-2">
                                            <span className="text-dark">
                                              Start Event :
                                            </span>{" "}
                                            {event.start.slice(0, 10)}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div>
                                          <p className="text-muted mb-0 mo-mb-2">
                                            <span className="text-dark">
                                              Finish on :
                                            </span>{" "}
                                            {event.finish.slice(0, 10)}{" "}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div>
                                          <a
                                            href="#products"
                                            className="text-primary"
                                          >
                                            Products{" "}
                                            <i className="mdi mdi-chevron-double-right"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="container " id="products">
                                  <div>
                                    <h4 className="title title-line">
                                      Product
                                    </h4>
                                  </div>
                                  <ProductsEvents products={event.Products} />
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
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
