import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

const Users = () => {

  const users_url = axios.get('/api/v1/users');
  const skills_url = axios.get('/api/v1/master_skills');
  const role_url = axios.get('api/v1/master_role');
  const projects_url = axios.get('api/v1/master_projects');

  const [users, setUsers] = useState([])
  const [skills, setSkills] = useState([])
  const [role, setRole] = useState([])
  const [projects, setProjects] = useState([])
  const [login, setLogin] = useState([])

  useEffect(() => {

    axios.all([users_url, skills_url, role_url, projects_url])
    .then(axios.spread((...response) => {
      setUsers(response[0].data.data)
      setLogin(response[0].data.included)
      setSkills(response[1].data.data)
      setRole(response[2].data.data)
      setProjects(response[3].data.data)
    }))
    .catch(response => console.log(response))

    // axios.get('/api/v1/users.json')
    // .then(response => {
    //   setIncluded(response.data.included)
    //   setUsers(response.data.data)
    //   console.log(users)
    //   console.log(included)
    // })
    // .catch(response => console.log(response))
  }, [users.length, login.lenght, skills.length, role.length, projects.length])

  // const listUser = users.map( user => {
  //   return( <li key={user.attributes.login_id}>{user.attributes.first_name} {user.attributes.last_name}</li> )
  // })
  
  // const listIncluded = included.map( inc => {
  //   return(
  //     <li>
  //       {inc.type}
  //     </li>
  //   )
  // })

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

  function CreateTable() {
    return(
      <table className="table table-hover ">
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
            {users.map((user, index) => (
              <tr>
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
                  if (user.relationships.master_role.data.id == rl.attributes.id) {
                    return(
                      <td>{rl.attributes.role_name}</td>
                    )
                  }
                })}

                  <td>
                    {user.relationships.master_projects.data.map((usr, index) => {
                      let obj = FindProject(usr.id);
                      if (obj != null) {
                        return(
                          obj.attributes.proj_name + " "
                          // usr.id + " "
                        )
                      }
                    })}
                  </td>

              
                {/* {included.map((inc, index) => {
                  if (inc.id == user.attributes.login_id) {
                    if (inc.type == "login") {
                      return(
                        <td>{inc.attributes.email}</td>
                      )
                    }
                    if (inc.type == "master_skill") {
                      return(
                        <td>{inc.attributes.skill_name}</td>
                      )
                    }
                    if (inc.type == "master_role") {
                      return(
                        <td>{inc.attributes.role_name}</td>
                      )
                    }
                    if (inc.type == "master_project") {
                      return(
                        <td>{inc.attributes.proj_name}</td>
                      )
                    } 
                  }
                })} */}

              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2>This is the Users#Index script</h2>
      <div>
        <CreateTable />
      </div>
    </div>
  )
}

export default Users;