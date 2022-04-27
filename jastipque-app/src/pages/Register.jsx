import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import bg from "../assets/huper-by-joshua-earle-5lgPYsE_qe0-unsplash.jpg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { registerUser } from "../store/actions/userActions";

const MySwal = withReactContent(Swal);

export default function Register() {
  const [UserRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    if (UserRegister.password !== UserRegister.confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be match",
      });
    }
    dispatch(registerUser(UserRegister));
    history.push("/login");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserRegister({ ...UserRegister, [name]: value });
  };

  return (
    <>
      <div className="back-to-home rounded d-none d-sm-block">
        <Link to="/" className="text-white rounded d-inline-block text-center">
          <i className="mdi mdi-home"></i>
        </Link>
      </div>
      <section
        className="vh-100"
        style={{
          background: `url(${bg})`,
        }}
      >
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="login_page bg-white shadow rounded p-4">
                    <div className="text-center">
                      <h4 className="mb-4">Signup</h4>
                    </div>
                    <form className="login-form" onSubmit={handleRegister}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group position-relative">
                            <label>
                              username <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="username"
                              name="username"
                              required=""
                              value={UserRegister.username}
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group position-relative">
                            <label>
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              required=""
                              value={UserRegister.email}
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group position-relative">
                            <label>
                              Password <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              required=""
                              name="password"
                              value={UserRegister.password}
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group position-relative">
                            <label>
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm Password"
                              required=""
                              name="confirmPassword"
                              value={UserRegister.confirmPassword}
                              onChange={(e) => handleOnChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="custom-control m-0 custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                              >
                                I Accept{" "}
                                <a href="#" className="text-primary">
                                  Terms And Condition
                                </a>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button className="btn btn-primary w-100">
                            Register
                          </button>
                        </div>
                        <div className="mx-auto text-center">
                          <p className="mb-0 mt-3">
                            <small className="text-dark mr-2">
                              Already have an account ?
                            </small>{" "}
                            <Link
                              to="/login"
                              className="text-dark font-weight-bold"
                            >
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
