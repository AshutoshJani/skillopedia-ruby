import React, { useEffect } from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/users";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          this.setState({ users: response })
        })
        .catch(() => this.props.history.push("/"));
  }

  render() {

    const { users } = this.state;
    console.log(users.data)
    console.log(users.included)

    const allUsers = users.map((user, index) => (

        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Skill Set</th>
              <th scope="col">Role</th>
              <th scope="col">Project</th>
            </tr>
          </thead>
          <tbody>
            {user.data.map((user) => (
              <tr key={index}>
                {Object.values(user).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}

            {/* <tr>
              <th scope="row"></th>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.login.email}</td>
              <td>
                <% user.master_skills.each do |skill| %>
                  <%= skill.skill_name %>
                <% end %>
              </td>
              <td><%= user.master_role.role_name %></td>
              <td>
                <% user.master_projects.each do |project| %>
                  <%= project.proj_name %>
                <% end %>
              </td>
            </tr> */}

          </tbody>
        </table>           
    ));

    return (
      <>
        <div class="container-fluid">
          <div class="row mt-4">
            <div class="col-lg-2 sidebar">
              <h2>Skillopedia</h2>
            </div>
            <div class="col-lg-10 team-listing">
              <h4>Team Members</h4>
              <div className="row">
                { allUsers }
              </div>
              {/* <%= render 'user' %> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;