import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const Admin = () => {

  const users_url = axios.get("/api/v1/users");
  const current_user_url = axios.get("/api/v1/current_user");

  const [users, setUsers] = useState([])
  const [login, setLogin] = useState([])
  const [current_user, setCurrentUser] = useState([])

  useEffect(() => {

    axios.all([users_url, current_user_url])
    .then(axios.spread((...response) => {
      setUsers(response[0].data.data)
      setLogin(response[0].data.included)
      setCurrentUser(response[1].data)
    }))
    .catch(response => console.log(response))
  }, [users.length, login.length, current_user.length])

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
              <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align mt-2">Profile</Link>
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
          {login.map((log, index) => {
            return users.map((usr, index) => {
              if (log.attributes.id == usr.attributes.login_id) {
                if (usr.attributes.signup_request == null) {
                  return(
                    <tr>
                      <td>{log.attributes.email}</td>
                      <td>
                        <button className="btn btn-outline-success me-2" onClick={handleAccept} data-param={usr.id}>Accept</button>
                        <button className="btn btn-outline-danger" onClick={handleReject} data-param={usr.id}>Reject</button>
                      </td>
                    </tr>
                  )
                }
              }
            })
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