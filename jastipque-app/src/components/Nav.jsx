import { Link } from "react-router-dom";
import logo from "../assets/For-Navbar.png";
import { useHistory } from "react-router-dom";

export default function Nav() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    history.push('/')
    window.location.reload();
  };

  return (
    <>
      <header id="topnav" className="defaultscroll scroll-active">
        <div className="container">
          <div>
            <Link to="/" className="logo">
              <img src={logo} alt="" className="logo-light" height="30" />
              <img src={logo} alt="" className="logo-dark" height="30" />
            </Link>
          </div>
          <div className="buy-button">
            {!localStorage.getItem("access_token") ? (
              <Link to="/login" className="btn btn-primary">
                <i className="mdi mdi-login-variant"></i> Login
              </Link>
            ) : (
              <a onClick={handleLogout} className="btn btn-primary">
                <i className="mdi mdi-logout-variant"></i> Logout
              </a>
            )}
          </div>
          <div className="menu-extras">
            <div className="menu-item">
              <a className="navbar-toggle">
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>

          <div id="navigation">
            <ul className="navigation-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              {localStorage.getItem("access_token") ? (
                <>
                  <li className="has-submenu">
                    <Link to="/list-order-header">Order Headers</Link>
                  </li>
                </>
              ) : (
                <>
                  <li></li>
                </>
              )}

              {localStorage.getItem("access_token") ? (
                <>
                  <li className="has-submenu">
                    <Link to="/chat">Chat</Link>
                  </li>
                </>
              ) : (
                <>
                  <li></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
