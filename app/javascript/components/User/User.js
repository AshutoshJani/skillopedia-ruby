import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {

  const params = useParams();
  const user_url = axios.get(`/api/v1/users/${params.id}`);
  const m_skills_url = axios.get('/api/v1/master_skills');
  const role_url = axios.get('/api/v1/master_role');
  const projects_url = axios.get('/api/v1/master_projects');
  const current_user_url = axios.get('/api/v1/current_user');
  const skills_url = axios.get('/api/v1/skills');

  const [user, setUser] = useState([])
  const [m_skills, setMSkills] = useState([])
  const [role, setRole] = useState([])
  const [projects, setProjects] = useState([])
  const [login, setLogin] = useState([])
  const [current_user, setCurrentUser] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {

    axios.all([user_url, m_skills_url, role_url, projects_url, current_user_url, skills_url])
    .then(axios.spread((...response) => {
      setUser(response[0].data.data)
      setLogin(response[0].data.included)
      setMSkills(response[1].data.data)
      setRole(response[2].data.data)
      setProjects(response[3].data.data)
      setCurrentUser(response[4].data)
      setSkills(response[5].data.data)
    }))
    .catch(response => console.log(response))

  }, [user.length, login.lenght, skills.length, role.length, projects.length, current_user.length, skills.length])

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

  function FindProject(idToSearch) {
    return projects.find(item => {
      return item.attributes.id == idToSearch
    })
  };

  function FindMSkill(idToSearch) {
    return m_skills.find(item => {
      return item.attributes.id == idToSearch
    })
  };

  function FindSkill(idToSearch) {
    return skills.find(item => {
      return item.id == idToSearch
    })
  };

  function Profile() {
    var first = "";
    var last = "";
    var email = "";
    var exp = "";
    var git = "";
    var rol = "";
    var proj = "";
    var skill_name = [];
    var self_rating = [];
    var exp_skill = [];
    var count = -1;
    var skills_list = "";


    if (user.length != 0) {
      first = user.attributes.first_name
      last = user.attributes.last_name

      login.map((log, index) => {
        if (log.attributes.id == user.attributes.login_id) {
          email = log.attributes.email
        }
      })

      exp = user.attributes.exp_year + "y " + user.attributes.exp_month + "m"

      git = user.attributes.github

      role.map((rl, index) => {
        if (user.relationships.master_role.data.id == rl.attributes.id) {
          rol = rl.attributes.role_name
        }
      })

      user.relationships.master_projects.data.map((usr, index) => {
        let obj = FindProject(usr.id);
        if (obj != null) {
          proj += obj.attributes.proj_name + " "
        }
      })

      user.relationships.master_skills.data.map((usr, index) => {
        let obj = FindMSkill(usr.id);
        if (obj != null) {
          skill_name[++count] = obj.attributes.skill_name
        }
      })
      count = -1;
      if (skills.length != 0) {
        user.relationships.skills.data.map((usr, index) => {
          let obj = FindSkill(usr.id);
          if (obj != null) {
            self_rating[++count] = obj.attributes.self_rating
            exp_skill[count] = obj.attributes.exp_year + "y " + obj.attributes.exp_month + "m" 
          }
        })
  
        var skill_obj = skill_name.map((skl, i) => 
        ({
          "skill_name": skl,
          "self_rating": self_rating[i],
          "experience": exp_skill[i]
        })
        )

        skills_list = skill_obj.map((it, index) => {
          <tr>
            <td>{it.skill_name}</td>
            <td>{it.self_rating}</td>
            <td>{it.experience}</td>
          </tr>
        })
      }
    }

    return(
      <div className="row mt-4">
        <div className="col-3">
          <div className="card profile-info">
            <div className="card-header">
              <h4>Profile Information</h4>
            </div>
            <div className="card-body">
              <div className="lead">
                First Name: <br />
                <b>{first}</b> <br />
              </div>
              <div className="lead mt-2">
                Last Name: <br />
                <b>{last}</b> <br />
              </div>
              <div className="lead mt-2">
                Email: <br />
                <b>{email}</b> <br />
              </div>
              <div className="lead mt-2">
                Total Experience: <br />
                <b>{exp}</b> <br />
              </div>
              <div className="lead mt-2">
                Github: <br />
                <b>{git}</b> <br />
              </div>
              <div className="lead mt-2">
                Role: <br />
                <b>{rol}</b> <br />
              </div>
              <div className="lead mt-2">
                Current Project: <br />
                <b>{proj}</b> <br />
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="card profile-tab">
            <div className="card-header">
              <h4>Skill Set</h4>
            </div>
            <div className="card-body">

            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Skill Name</th>
                  <th scope="col">Self Rating</th>
                  <th scope="col">Experience</th>
                </tr>
              </thead>
              <tbody> 
                {skills_list}
              </tbody>
            </table>

            </div>
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

          <div className="container">
            <Profile />
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