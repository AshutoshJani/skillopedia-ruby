import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const User = () => {

  const history = useHistory();

  const params = useParams();
  const user_url = axios.get(`/api/v1/users/${params.id}`);
  const m_skills_url = axios.get('/api/v1/master_skills');
  const role_url = axios.get('/api/v1/master_role');
  const projects_url = axios.get('/api/v1/master_projects');
  const current_user_url = axios.get('/api/v1/current_user');
  const skills_url = axios.get('/api/v1/skills');
  const assoc_role_url = axios.get('/api/v1/role');
  const users_url = axios.get('/api/v1/users');

  const [user, setUser] = useState([])
  const [m_skills, setMSkills] = useState([])
  const [role, setRole] = useState([])
  const [projects, setProjects] = useState([])
  const [login, setLogin] = useState([])
  const [current_user, setCurrentUser] = useState([])
  const [skills, setSkills] = useState([])
  const [assoc_role, setAssocRole] = useState([])
  const [users, setUsers] = useState([])

  const [dispEP, setDispEP] = useState(false)
  const [dispAS, setDispAS] = useState(false)

  const profileForm = useRef(null)
  const skillForm = useRef(null)

  const handleSave = (e) => {
    e.preventDefault()
    const form = profileForm.current
    var year = form['total_exp'].value.split(" ")[0].replace('y', '')
    var month = form['total_exp'].value.split(" ")[1].replace('m', '')
    var proj_name = []
    var selected_proj = form['proj_name'].selectedOptions
    for (let i=0; i<selected_proj.length; i++) {
      proj_name.push(selected_proj[i].value);
    } 
    var jsonObject = {
      first_name: form['first_name'].value,
      last_name: form['last_name'].value,
      email: form['email'].value,
      exp_year: parseInt(year),
      exp_month: parseInt(month),
      github: form['github'].value,
      role_name: form['role'].value,
      proj_name: proj_name
    };
    updatePostRequest(jsonObject)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const form = skillForm.current
    var jsonObject = {
      skill_name: form['skill_name'].value,
      self_rating: form['self_rating'].value,
      exp_year: form['exp_year'].value,
      exp_month: form['exp_month'].value
    };
    updatePostRequest(jsonObject)
  }

  function updatePostRequest(jsonObject) {
    axios.put(`/api/v1/users/${params.id}`, jsonObject)
    .then(
      response => console.log(response),
      location.reload(),
      alert("User successfully updated")
    )
    .catch(response => console.log(response))
  }

  useEffect(() => {

    axios.all([user_url, m_skills_url, role_url, projects_url, current_user_url, skills_url, assoc_role_url, users_url])
    .then(axios.spread((...response) => {
      setUser(response[0].data.data)
      setLogin(response[0].data.included)
      setMSkills(response[1].data.data)
      setRole(response[2].data.data)
      setProjects(response[3].data.data)
      setCurrentUser(response[4].data)
      setSkills(response[5].data.data)
      setAssocRole(response[6].data.data)
      setUsers(response[7].data.data)
    }))
    .catch(response => console.log(response))

  }, [user.length, login.lenght, skills.length, role.length, projects.length, current_user.length, skills.length, assoc_role.length, users.length])

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
    var active = <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align mt-2">Profile</Link>
    if (params.id == current_user.id) {
      active = <Link to={`/users/${current_user.id}`} type="button" className="btn btn-outline-primary left-align active mt-2">Profile</Link>
    }

    var admin = "";
    var usr = "";
    
    if (assoc_role.length > 0 || assoc_role.data != undefined) {
      if(users.length != 0) {
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
              {admin}
              <button type="button" className="btn btn-outline-secondary left-align bottom" onClick={logout}>Logout</button>
            </nav>
          </div>
          <div className="col-10 team-listing">
            <CreateProfile />
          </div>
        </div>
      </div>
    )
  }

  function handleChangeProfile() {
    setDispEP(!dispEP)
  }

  function handleAddSkill() {
    setDispAS(!dispAS)
  }

  function EditProfile() {
    var first = "";
    var last = "";
    var email = "";
    var exp = "";
    var git = "";
    var rol = "";
    var proj = "";
    
    if (user.length != 0) {
      first = user.attributes.first_name
      last = user.attributes.last_name

      login.map((log, index) => {
        if (log.attributes.id == user.attributes.login_id) {
          email = log.attributes.email
        }
      })

      exp = `${user.attributes.exp_year}y ${user.attributes.exp_month}m`

      git = user.attributes.github

      role.map((rl, index) => {
        if (user.relationships.master_role.data) {
          if (user.relationships.master_role.data.id == rl.attributes.id) {
            rol = rl.attributes.role_name
          }
        }
      })

      user.relationships.master_projects.data.map((usr, index) => {
        let obj = FindProject(usr.id);
        if (obj != null) {
          proj += obj.attributes.proj_name + " "
        }
      })
    }

    return(
      <div className="card profile-info">
        <div className="card-header">
          <div className="row">
            <div className="col-9">
              <h4>Profile Information</h4>
            </div>
            <div className="col-3">
              <button type="button" className="btn btn-outline-info" onClick={handleChangeProfile}>Edit</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form ref={profileForm}>
            <div className="">
              First Name: <br />
              <div class="input-group mb-3">
                <input type="text" class="form-control" defaultValue={first} label={'first name'} name={'first_name'} />
              </div>
            </div>
            <div className="mt-2">
              Last Name: <br />
              <div class="input-group mb-3">
                <input type="text" class="form-control" defaultValue={last} label={'last name'} name={'last_name'} />
              </div>
            </div>
            <div className="mt-2">
              Email: <br />
              <div class="input-group mb-3">
                <input type="text" class="form-control" defaultValue={email} label={'email'} name={'email'} />
              </div>
            </div>
            <div className="mt-2">
              Total Experience: <br />
              <div class="input-group mb-3">
                <input type="text" class="form-control" defaultValue={exp} label={'total experience'} name={'total_exp'} />
              </div>
            </div>
            <div className="mt-2">
              Github: <br />
              <div class="input-group mb-3">
                <input type="text" class="form-control" defaultValue={git} label={'github'} name={'github'} />
              </div>
            </div>
            <div className="mt-2">
              Role: <br />
              <select class="form-select" label={'role'} name={'role'} >
                <option selected>{rol}</option>
                {role.map((rl, index) => {
                  return(
                    <option value={rl.attributes.role_name}>{rl.attributes.role_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="mt-2">
              Current Project: <br />
              <select class="form-select" multiple label={'current project'} name={'proj_name'} >
                <option selected>{proj}</option>
                {projects.map((pr, index) => {
                  return(
                    <option value={pr.attributes.proj_name}>{pr.attributes.proj_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="row">
              <div className="col">
                <button class="btn btn-outline-success mt-2" onClick={handleSave}>Save</button>
              </div>
              <div className="col">
                <button class="btn btn-outline-danger mt-2" onClick={handleChangeProfile}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  function AddSkill() {
    return(
      <form ref={skillForm}>
        <table className="table table-borderless">
          <tbody>
            <tr className="row">
              <td className="col">
                <select class="form-select" label={'skill name'} name={'skill_name'} >
                  {m_skills.map((sk, index) => {
                    return(
                      <option value={sk.attributes.skill_name}>{sk.attributes.skill_name}</option>
                    )
                  })}
                </select>
              </td>
              <td className="col input-group">
                <input type="text" class="form-control" label={'self rating'} name={'self_rating'} placeholder="Self Rating" />
                <span class="input-group-text" id="basic-addon2">out of 5</span>
              </td>
              <td className="col input-group">
                <input type="text" class="form-control" label={'exp year'} name={'exp_year'} placeholder="Exp" />
                <span class="input-group-text" id="basic-addon2">years</span>
                <input type="text" class="form-control" label={'exp month'} name={'exp_month'} placeholder="Exp" />
                <span class="input-group-text" id="basic-addon2">months</span>
              </td>
              <td className="col">
                <button className="btn btn-outline-success" onClick={handleAdd}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
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
        if (user.relationships.master_role.data) {
          if (user.relationships.master_role.data.id == rl.attributes.id) {
            rol = rl.attributes.role_name
          }
        }
      })

      user.relationships.master_projects.data.map((usr, index) => {
        let obj = FindProject(usr.id);
        if (obj != null) {
          proj += obj.attributes.proj_name + " "
        }
      })
    }

    return(
      <div className="card profile-info">
        <div className="card-header">
          <div className="row">
            <div className="col-9">
              <h4>Profile Information</h4>
            </div>
            <div className="col-3">
              <button type="button" className="btn btn-outline-info" onClick={handleChangeProfile}>Edit</button>
            </div>
          </div>
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
    )
  }

  function SkillsInfo() {
    var skill_name = [];
    var self_rating = [];
    var exp_skill = [];
    var count = -1;
    var skills_list = "";

    if (user.length != 0) {
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
            self_rating[++count] = obj.attributes.self_rating + "/5"
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
          return(
            <tr>
              <td>{it.skill_name}</td>
              <td>{it.self_rating}</td>
              <td>{it.experience}</td>
            </tr>
          )
        })
      }

    }

    return(
      <div className="card profile-tab">
        <div className="card-header">
          <div className="row">
            <div className="col-10">
              <h4>Skill Set</h4>
            </div>
            <div className="col-2">
              <button type="button" className="btn btn-outline-info" onClick={handleAddSkill}>Add Skill</button>
            </div>
          </div>
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

          {
            (dispAS) ?
              <AddSkill />
            :
              <br />
          }

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
                      <button className="btn btn -link nav-link lead active">Profile</button>
                    </li>
                    <li class="nav-item">
                      <button className="btn btn-link nav-link lead">Endorsements</button>
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
            <div className="row mt-4">
              <div className="col-3">
                {
                  (!dispEP) ?
                    <Profile />
                  :
                    <EditProfile />
                }
              </div>
              <div className="col-9">
                <SkillsInfo />
              </div>
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