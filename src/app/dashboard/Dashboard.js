import React, { useEffect, useState, useMemo } from "react";
import { get } from "lodash";
import DataTable from "react-data-table-component";
import Modal from "./Modal";
import Swal from "sweetalert2";

import { getUsers, deleteUser, updateUser, addUser } from "../api/users";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const columns = useMemo(
    () => [
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) =>
          `${get(row, "name.firstname", "")} ${get(row, "name.lastname", "")}`,
        sortable: true,
      },
      {
        name: "Phone",
        selector: (row) => row.phone,
        sortable: true,
      },
      {
        name: "",
        cell: (row) => (
          <>
            <button
              type="button"
              className="btn btn-inverse-danger btn-icon"
              onClick={() => removeUser(row, users)}
            >
              <i className="mdi mdi-delete"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-fw"
              onClick={() => onShow(row)}
            >
              See Detail
            </button>
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users]
  );

  function removeUser(data) {
    Swal.fire({
      title: `Are you sure you want to delete ${data.username}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(data.id);
          Swal.fire(
            "Deleted!",
            `User ${data.username} has been deleted. (The user will not be deleted on the database)`,
            "success"
          );
          const newUsers = users.slice().filter((x) => x.id !== data.id);
          setUsers(newUsers);
        } catch (error) {}
      }
    });
  }

  async function modifyUser(user) {
    try {
      const { data } = await updateUser(user.id, user);
      Swal.fire(
        "Updated!",
        `User ${data.username} has been updated!`,
        "success"
      );

      //hasil return tidak lengkap dari api
      const newUsers = users.map((x) => {
        if (x.id === data.id) {
          return user;
        } else {
          return x;
        }
      });
      setUsers(newUsers);
      onClose();
    } catch (error) {}
  }

  async function createUser(user) {
    try {
      const { data } = await addUser(user);
      Swal.fire(
        "Created!",
        `User ${data.username} has been Created!`,
        "success"
      );
      const returns = { ...user, id: data.id };
      const newUsers = [...users, returns];
      setUsers(newUsers);
      onClose(0);
    } catch (error) {}
  }

  async function fetchUsers() {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (error) {}
  }

  function onClose() {
    setShowModal(false);
    setSelectedData({});
  }

  function onShow(data) {
    setShowModal(true);
    setSelectedData(data);
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-home"></i>
          </span>
          Users
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Users List</h4>
              <button
                type="button"
                className="btn btn-inverse-primary btn-fw"
                onClick={() => setShowModal(true)}
              >
                Add User
              </button>

              <div className="table-responsive">
                <DataTable columns={columns} data={users} pagination />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={onClose}
        data={selectedData}
        updateFun={modifyUser}
        createFun={createUser}
      />
    </div>
  );
}
