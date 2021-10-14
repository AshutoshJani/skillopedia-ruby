import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {

  const [user, setUser] = useState([]);
  const [included, setIncluded] = useState([]);

  useEffect(() => {
    axios.get(`api/v1/users/:id`)
    .then(response => {
      setIncluded(response.data.included)
      setUser(response.data.data)
      console.log(user)
      console.log(included)
    })
    .catch(response => console.log(response))
  })


  function UserProfile() {
    return(
      <>
        {user}
        {included}
      </>
    )
  }

  return (
    <div>
      <div>
        <h2>This is the Users#Show script</h2>
      </div>
      <div>
        <UserProfile />
      </div>
    </div>
  )
}

export default User;