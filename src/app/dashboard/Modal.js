import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ModalForm({
  data = {},
  show,
  onHide,
  updateFun = () => {},
  createFun = () => {},
}) {
  const [modalValue, setModalValue] = useState({});

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setModalValue(data);
    } else {
      setModalValue({
        email: "",
        username: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
        address: {
          city: "",
          street: "",
          number: 0,
          zipcode: "",
          geolocation: {
            lat: "",
            long: "",
          },
        },
        phone: "",
      });
    }
  }, [data]);

  function changeValue(val, key, level, key2, key3) {
    let objValue = {};

    if (level === 2) {
      objValue = {
        ...modalValue[key],
        [key2]: val,
      };
    }

    if (level === 3) {
      objValue = {
        ...modalValue[key],
        [key2]: {
          ...modalValue[key][key2],
          [key3]: val,
        },
      };
    }

    setModalValue((prevState) => ({
      ...prevState,
      [key]: level > 1 ? objValue : val,
    }));
  }

  function submit() {
    if (Object.keys(data).length > 0) {
      updateFun(modalValue);
    } else {
      if (modalValue.username && modalValue.email) {
        createFun(modalValue);
      } else {
        Swal.fire("Error!", `you need to fill username & email!`, "error");
      }
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <form style={{ padding: "1rem 5rem" }}>
          <p className="card-description"> Personal info </p>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">First Name</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "name.firstname", "")}
                    onChange={(e) =>
                      changeValue(e.target.value, "name", 2, "firstname")
                    }
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Last Name</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "name.lastname", "")}
                    onChange={(e) =>
                      changeValue(e.target.value, "name", 2, "lastname")
                    }
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "email", "")}
                    onChange={(e) => changeValue(e.target.value, "email", 1)}
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Username</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "username", "")}
                    onChange={(e) => changeValue(e.target.value, "username", 1)}
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Phone</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "phone", "")}
                    onChange={(e) => changeValue(e.target.value, "phone", 1)}
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <p className="card-description"> Address </p>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">City</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "address.city", "")}
                    onChange={(e) =>
                      changeValue(e.target.value, "address", 2, "city")
                    }
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Street</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "address.street", "")}
                    onChange={(e) =>
                      changeValue(e.target.value, "address", 2, "street")
                    }
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Zipcode</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "address.zipcode", "")}
                    onChange={(e) =>
                      changeValue(e.target.value, "address", 2, "zipcode")
                    }
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Number</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "address.number", "")}
                    onChange={(e) =>
                      changeValue(e.target.value, "address", 2, "number")
                    }
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Latitude</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "address.geolocation.lat", "")}
                    onChange={(e) =>
                      changeValue(
                        e.target.value,
                        "address",
                        3,
                        "geolocation",
                        "lat"
                      )
                    }
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Longitude</label>
                <div className="col-sm-9">
                  <Form.Control
                    type="text"
                    value={get(modalValue, "address.geolocation.long", "")}
                    onChange={(e) =>
                      changeValue(
                        e.target.value,
                        "address",
                        3,
                        "geolocation",
                        "long"
                      )
                    }
                  />
                </div>
              </Form.Group>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-dark btn-fw"
          onClick={onHide}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-outline-primary btn-fw"
          onClick={submit}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}
