import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useHistory } from "react-router-dom";

const Users = () => {

  const history = useHistory();

  const users_url = axios.get('/api/v1/users');
  const skills_url = axios.get('/api/v1/master_skills');
  const role_url = axios.get('/api/v1/master_role');
  const projects_url = axios.get('/api/v1/master_projects');
  const current_user_url = axios.get('/api/v1/current_user');
  const assoc_role_url = axios.get('/api/v1/role');

  const [users, setUsers] = useState([])
  const [skills, setSkills] = useState([])
  const [role, setRole] = useState([])
  const [projects, setProjects] = useState([])
  const [login, setLogin] = useState([])
  const [current_user, setCurrentUser] = useState([])
  const [assoc_role, setAssocRole] = useState([])

  useEffect(() => {

    axios.all([users_url, skills_url, role_url, projects_url, current_user_url, assoc_role_url])
    .then(axios.spread((...response) => {
      setUsers(response[0].data.data)
      setLogin(response[0].data.included)
      setSkills(response[1].data.data)
      setRole(response[2].data.data)
      setProjects(response[3].data.data)
      setCurrentUser(response[4].data)
      setAssocRole(response[5].data.data)
    }))
    .catch(response => console.log(response))

  }, [users.length, login.length, skills.length, role.length, projects.length, current_user.length, assoc_role.length])

  function FindProject(idToSearch) {
    return projects.find(item => {
      return item.attributes.id == idToSearch
    })
  };

  function FindSkill(idToSearch) {
    return skills.find(item => {
      return item.attributes.id == idToSearch
    })
  };

  function UserShow(user) {
    history.push(`/users/${user.id}`)
  }

  function logout() {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    // axios.delete("/logins/sign_out", {withCredentials: true})
    // .then(response => console.log(response))
    fetch("/api/v1/logout"
    , {
      method: 'delete',
      headers: {
        'Content-type': 'application/javascript',
        'Accept': 'application/javascript',
        'X-CSRF-Token': csrf
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
    var admin = "";
    var usr = "";
    
    if (assoc_role.length > 0 || assoc_role.data != undefined) {
      users.map((us, index) => {
        if (us.attributes.login_id == current_user.id) {
          usr = us
        }
      })
      assoc_role.map((rl, index) => {
        if (rl.id == usr.relationships.role.data.id) {
          if (rl.attributes.admin == true) {
            admin = <Link to="/admin" type="button" className="btn btn-outline-primary left-align mt-2">Admin Page</Link>
          }
        }
      })
    }

    return(
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2">
            <h2>Skillopedia</h2>
            <hr />
            <nav class="nav flex-column nav-pill nav-fill mt-4">
              <Link to="/" type="button" className="btn btn-outline-primary left-align active">Dashboard</Link>
              <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align mt-2">Profile</Link>

              {admin}

              <button type="button" className="btn btn-outline-secondary left-align bottom" onClick={logout}>Logout</button>
            </nav>
          </div>
          <div className="col-10 team-listing">
            <CreateTable />
          </div>
        </div>
      </div>
    )
  }

  function CreateTable() {
    return(
      <table className="table table-hover">
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Skills</td>
            <td>Role</td>
            <td>Projects</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            if (user.attributes.signup_request == true && user.id != current_user.id) {
              return(
                <tr className="clickable" onClick={() => UserShow(user)}>
                  <td>{user.attributes.first_name}</td>
                  <td>{user.attributes.last_name}</td>

                  {login.map((log, index) => {
                    if (log.attributes.id == user.attributes.login_id) {
                      return(
                        <td>{log.attributes.email}</td>
                      )
                    }
                  })}

                    <td>
                      {user.relationships.master_skills.data.map((usr, index) => {
                        let obj = FindSkill(usr.id);
                        if (obj != null) {
                          return(
                            obj.attributes.skill_name + " "
                          )
                        }
                      })}
                    </td>

                  {role.map((rl, index) => {
                    if (user.relationships.master_role.data) {
                      if (user.relationships.master_role.data.id == rl.attributes.id) {
                        return(
                          <td>{rl.attributes.role_name}</td>
                        )
                      }
                    }
                  })}

                    <td>
                      {user.relationships.master_projects.data.map((usr, index) => {
                        let obj = FindProject(usr.id);
                        if (obj != null) {
                          return(
                            obj.attributes.proj_name + " "
                          )
                        }
                      })}
                    </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <CreateInterface />
    </div>
  )
}

export default Users;