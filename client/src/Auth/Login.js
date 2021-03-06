import React, { useState } from "react";
import { postData } from "../Fetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postData(
      "/user/login",
      {
        userName,
        password,
      },
      "POST"
    )
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/profile");
        console.log(data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>
              <form action="#" method="post" onSubmit={onSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="sam"
                    name="userName"
                    onChange={onChange}
                  />
                  <label for="floatingInput">username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberPasswordCheck"
                  />
                  <label
                    className="form-check-label"
                    for="rememberPasswordCheck"
                  >
                    Remember password
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold mb-2"
                    type="submit"
                    value="submit"
                  >
                    Sign in
                  </button>
                  <button
                    className="btn btn-success btn-login text-uppercase fw-bold "
                  onClick={()=>{
                    navigate("/register")
                  }}
                  >
                    Register
                  </button>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button className="btn btn-google btn-login text-uppercase fw-bold">
                    <i className="fab fa-google me-2"></i> Sign in with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
