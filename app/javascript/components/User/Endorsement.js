import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Endorsement = () => {

  const params = useParams();
  const user_url = axios.get(`/api/v1/users/${params.id}`);
  const endorsement_url = axios.get(`/api/v1/endorsements/${params.id}`);

  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [endorsement, setEndorsement] = useState([]);

  useEffect(() => {
    axios.all([user_url, endorsement_url])
    .then(axios.spread((...response) => {
      setUser(response[0].data.data)
      setEndorsement(response[1].data.data)
      console.log(endorsement)
    }))
    .catch(response => console.log(response))
  }, [user.length, endorsement.length])

  var userName = "";
    if (user.length != 0) {
      userName = user.attributes.first_name + " " + user.attributes.last_name
    }

  return ( 
    <div className="card profile-info">
      <div className="card-header">
        <div className="row">
          <div className="col-12">
            <h4>Endorsements</h4>
          </div>
        </div>
      </div>
      <div className="card-body">
        <ul>
          {endorsement.map((endor, index) => {
            return(
              <li>
                <strong>Rating: {endor.attributes.rating}</strong>
                <p>{endor.attributes.comment} - {endor.attributes.endorser_name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
 
export default Endorsement;
