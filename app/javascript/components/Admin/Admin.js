import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Cookies from "universal-cookie";

const Admin = () => {
  const cookie = new Cookies();

  const users_url = axios.get("/api/v1/users");

  const [users, setUsers] = useState([])

  useEffect(() => {

    axios.all([users_url])
    .then(axios.spread((...response) => {
      setUsers(response[0].data.data)
    }))
    .catch(response => console.log(response))
  }, [users.length])

  function logout() {
    fetch("/api/v1/logout"
    , {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
        },
    })
    .then((response) => {
      console.log(response)
    })
  }

  const handleAccept = (e) => {
    e.preventDefault()
    const { param } = e.target.dataset;
    var jsonObject = {
      signup_request: true
    };
    updatePostRequest(jsonObject, param)
  }

  const handleReject = (e) => {
    e.preventDefault()
    const { param } = e.target.dataset;
    var jsonObject = {
      signup_request: false
    };
    updatePostRequest(jsonObject, param)
  }

  function updatePostRequest(jsonObject, param) {
    axios.put(`/api/v1/current_user/${param}`, jsonObject)
    .then(
      response => console.log(response),
      location.reload(),
      alert("User successfully updated")
    )
    .catch(response => console.log(response))
  }

  function CreateInterface() {

    return(
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2">
            <h2>Skillopedia</h2>
            <hr />
            <nav class="nav flex-column nav-pill nav-fill mt-4">
              <Link to="/" type="button" className="btn btn-outline-primary left-align">Dashboard</Link>
              <Link to={`/users/${cookie.get('user_id')}`} type="button" className="btn btn-outline-primary left-align mt-2">Profile</Link>
              <Link to="/admin" type="button" className="btn btn-outline-primary left-align active mt-2">Admin Page</Link>

              <button type="button" className="btn btn-outline-secondary left-align bottom" onClick={logout}>Logout</button>
            </nav>
          </div>
          <div className="col-10 team-listing">
            <AdminTable />
          </div>
        </div>
      </div>
    )
  }

  function AdminTable() {
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Email Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usr, index) => {
            if (usr.attributes.signup_request == null) {
              return(
                <tr>
                  <td>{usr.attributes.email_id}</td>
                  <td>
                    <button className="btn btn-outline-success me-2" onClick={handleAccept} data-param={usr.id}>Accept</button>
                    <button className="btn btn-outline-danger" onClick={handleReject} data-param={usr.id}>Reject</button>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    )
  }

  return(
    <div>
      <CreateInterface />
    </div>
  )
}

export default Admin;