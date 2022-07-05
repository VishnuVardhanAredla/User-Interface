import React, { useState } from "react";
import { postData } from "../Fetch";
import { useNavigate } from "react-router-dom";

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
        console.log(error);
      });
  };

  return (
    // <div class="container h-100">
    //   <div class="row align-items-center h-100">
    //     <div class="col-md-4"></div>
    //     <div class="col-md-4 h-100">
    //       <div class="card p-4 rounded mt-4">
    //         <h3>Register</h3>
    //         <form onSubmit={onSubmit}>
    //           <div class="row mt-4">
    //             <input
    //               type="name"
    //               class="form-control"
    //               placeholder="Enter userName"
    //               name="userName"
    //               required=""
    //               onChange={onChange}
    //             />
    //           </div>

    //           <div class="row mt-4">
    //             <input
    //               type="email"
    //               class="form-control"
    //               placeholder="Enter email"
    //               name="email"
    //               required=""
    //               onChange={onChange}
    //             />
    //           </div>
    //           <div class="row mt-4">
    //             <input
    //               type="password"
    //               class="form-control"
    //               placeholder="Enter password"
    //               name="password"
    //               onChange={onChange}
    //               required=""
    //             />
    //           </div>
    //           <div class="row mt-4">
    //             <button
    //               type="submit"
    //               value="submit"
    //               class="btn btn btn-primary w-auto"
    //             >
    //               Register
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //     <div class="col-md-4"></div>
    //   </div>
    // </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-3">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-4 fw-light fs-5">
                Register
              </h5>
              <form onSubmit={onSubmit}>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="userName"
                    placeholder="Enter username"
                    name="userName"
                    onChange={onChange}
                    required=""
                  />
                  <label for="userName">userName</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    onChange={onChange}
                    placeholder="name@example.com"
                  />
                  <label for="email">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberPasswordCheck"
                  />
                  <label class="form-check-label" for="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    value="submit"
                  >
                    Sign in
                  </button>
                </div>
                <hr class="my-4" />
                <div class="d-grid mb-2">
                  <button
                    class="btn btn-google btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    <i class="fab fa-google me-2"></i> Sign in with Google
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
