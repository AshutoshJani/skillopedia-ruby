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
    return(
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2">
            <h2>Skillopedia</h2>
            <hr />
            <nav class="nav flex-column nav-pill nav-fill mt-4">
              <Link to="/" type="button" className="btn btn-outline-primary left-align">Dashboard</Link>
              <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align active mt-2">Profile</Link>
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
    return(
      <h2>Profile</h2>
    )
  }

  return (
    <div>
      <CreateInterface />
    </div>
  )
}

export default User;