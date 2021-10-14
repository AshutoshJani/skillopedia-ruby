import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([])
  const [included, setIncluded] = useState([])

  useEffect(() => {
    axios.get('/api/v1/users.json')
    .then(response => {
      setIncluded(response.data.included)
      setUsers(response.data.data)
      console.log(users)
      console.log(included)
    })
    .catch(response => console.log(response))
  }, [users.length])

  const listUser = users.map( user => {
    return( <li key={user.attributes.login_id}>{user.attributes.first_name} {user.attributes.last_name}</li> )
  })
  
  const listIncluded = included.map( inc => {
    return(
      <li>
        {inc.type}
      </li>
    )
  })

  function CreateTable() {
    return(
      <table>
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
              
                {included.map((inc, index) => {
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
                })}

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