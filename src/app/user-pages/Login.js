import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { login } from "../api/users";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { get } from "lodash";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function submitLogin() {
    try {
      if (!username) throw new Error("Username empty");
      if (!password) throw new Error("Password empty");
      const { data } = await login({ username, password });
      localStorage.setItem("token", data.token);
      history.push("/");
    } catch (error) {
      if (get(error, "response.data", "")) {
        Swal.fire("Error!", error.response.data, "error");
      } else {
        Swal.fire("Error!", error.message, "error");
      }
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    size="lg"
                    className="h-auto"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={submitLogin}
                  >
                    SIGN IN
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
