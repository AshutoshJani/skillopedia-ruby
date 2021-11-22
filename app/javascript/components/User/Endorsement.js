import React, { useEffect, useState } from "react";
import axios from "axios";

const Endorsement = () => {

  const user_url = axios.get(`/api/v1/users/${params.id}`);
  const endorsement_url = axios.get(`/api/v1/endorsements/${params.id}`);

  const [user, setUser] = useState([]);
  const [endorsement, setEndorsement] = useState([]);

  useEffect(() => {
    axios.all([user_url, endorsement_url])
    .then(axios.spread((...response) => {
      setUser(response[0].data.data)
      setEndorsement(response[1].data)
    }))
    .catch(response => console.log(response))
  }, [user.length, endorsement.length])

  var userName = "";
    if (user.length != 0) {
      userName = user.attributes.first_name + " " + user.attributes.last_name
    }

  return ( 
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
          </div>
          <div className="card-body">
            <h2>Endorsement</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Endorsement;
