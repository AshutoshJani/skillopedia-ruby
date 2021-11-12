import React from "react";
import {Link} from "react-router-dom"

const Admin = () => {

  function logout() {
    fetch("/logins/sign_out"
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
  //   .then((result) => {
  //    window.location.href = '/';
  //  });
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
            Admin Table
          </div>
        </div>
      </div>
    )
  }

  return(
    <div>
      <CreateInterface />
    </div>
  )
}

export default Admin;