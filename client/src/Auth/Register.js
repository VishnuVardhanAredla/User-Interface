import React, { useState } from "react";
import { postData } from "../Fetch";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { userName, email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postData(
      "/user/register",
      {
        userName,
        email,
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
    // <div className="container h-100">
    //   <div className="row align-items-center h-100">
    //     <div className="col-md-4"></div>
    //     <div className="col-md-4 h-100">
    //       <div className="card p-4 rounded mt-4">
    //         <h3>Register</h3>
    //         <form onSubmit={onSubmit}>
    //           <div className="row mt-4">
    //             <input
    //               type="name"
    //               className="form-control"
    //               placeholder="Enter userName"
    //               name="userName"
    //               required=""
    //               onChange={onChange}
    //             />
    //           </div>

    //           <div className="row mt-4">
    //             <input
    //               type="email"
    //               className="form-control"
    //               placeholder="Enter email"
    //               name="email"
    //               required=""
    //               onChange={onChange}
    //             />
    //           </div>
    //           <div className="row mt-4">
    //             <input
    //               type="password"
    //               className="form-control"
    //               placeholder="Enter password"
    //               name="password"
    //               onChange={onChange}
    //               required=""
    //             />
    //           </div>
    //           <div className="row mt-4">
    //             <button
    //               type="submit"
    //               value="submit"
    //               className="btn btn btn-primary w-auto"
    //             >
    //               Register
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //     <div className="col-md-4"></div>
    //   </div>
    // </div>
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-3">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-4 fw-light fs-5">
                Register
              </h5>
              <form onSubmit={onSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    placeholder="Enter username"
                    name="userName"
                    onChange={onChange}
                    required=""
                  />
                  <label for="userName">userName</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={onChange}
                    placeholder="name@example.com"
                  />
                  <label for="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
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
                  <label className="form-check-label" for="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-google btn-login text-uppercase fw-bold"
                    type="submit"
                  >
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
