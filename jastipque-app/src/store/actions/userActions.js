import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// let url = `http://localhost:3000`;
let url = `https://app-server-jastip.herokuapp.com`;

export function loginUser(data) {
  return (dispatch) => {
    fetch(`${url}/users/customer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.access_token) {
          localStorage.setItem("access_token", user.access_token);
          localStorage.setItem("username", user.username);
        }
        if (user.success === false) {
          throw { err: user.err };
        }
      })
      .catch(({ err }) => {
        console.log(err);
        return MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err}`,
        });
      });
  };
}

export function registerUser(user) {
  return (dispatch) => {
    fetch(`${url}/users/customer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success === true) {
          MySwal.fire("Saved!", "user Created", "success");
        }
        if (result.success === false) {
          throw { err: result.err[0] };
        }
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
