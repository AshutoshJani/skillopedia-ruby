import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {

  const params = useParams();
  const user_url = axios.get(`/api/v1/users/${params.id}`);
  const skills_url = axios.get('/api/v1/master_skills');
  const role_url = axios.get('/api/v1/master_role');
  const projects_url = axios.get('/api/v1/master_projects');
  const current_user_url = axios.get('/api/v1/current_user')

  const [user, setUser] = useState([])
  const [skills, setSkills] = useState([])
  const [role, setRole] = useState([])
  const [projects, setProjects] = useState([])
  const [login, setLogin] = useState([])
  const [current_user, setCurrentUser] = useState([])

  useEffect(() => {

    axios.all([user_url, skills_url, role_url, projects_url, current_user_url])
    .then(axios.spread((...response) => {
      setUser(response[0].data.data)
      setLogin(response[0].data.included)
      setSkills(response[1].data.data)
      setRole(response[2].data.data)
      setProjects(response[3].data.data)
      setCurrentUser(response[4].data)
    }))
    .catch(response => console.log(response))

  }, [user.length, login.lenght, skills.length, role.length, projects.length, current_user.length])

  function CreateInterface() {
    var active = <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align mt-2">Profile</Link>
    if (params.id == current_user.id) {
      active = <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align active mt-2">Profile</Link>
    }
    return(
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2">
            <h2>Skillopedia</h2>
            <hr />
            <nav class="nav flex-column nav-pill nav-fill mt-4">
              <Link to="/" type="button" className="btn btn-outline-primary left-align">Dashboard</Link>
              {active}
            </nav>
          </div>
          <div className="col-10 team-listing">
            <CreateProfile />
          </div>
        </div>
      </div>
    )
  }

  function CreateProfile() {
    var userName = "";
    if (user.length != 0) {
      userName = user.attributes.first_name + " " + user.attributes.last_name
    }

    return(
      <div>
        <div className="row justify-content-md-center">
          <div className="top-profile">
            <div className="text-left profile-cover">
              <h4>Profile</h4>
            </div>
          </div>

          <div className="card card-profile">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h3>{userName}</h3>
                </div>
                <div className="col">
                  <ul class="nav justify-content-end">
                    <li class="nav-item">
                      <p className="nav-link lead active">Profile</p>
                    </li>
                    <li class="nav-item">
                      <p className="nav-link lead disabled">Endorsements</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              {login.map((log, index) => {
                if (log.attributes.id == user.attributes.login_id) {
                  return(
                    <p>{log.attributes.email}</p>
                  )
                }
              })}
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div>
      <CreateInterface />
    </div>
  )
}

export default User;