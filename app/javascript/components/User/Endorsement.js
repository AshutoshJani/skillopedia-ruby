import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Endorsement = () => {

  const params = useParams();
  const user_url = axios.get(`/api/v1/users/${params.id}`);
  const current_user_url = axios.get('/api/v1/current_user');
  const endorsement_url = axios.get(`/api/v1/endorsements/${params.id}`);

  const [user, setUser] = useState([]);
  const [current_user, setCurrentUser] = useState([]);
  const [endorsement, setEndorsement] = useState([]);
  const [dispEndor, setDispEndor] = useState(false);

  const endorForm = useRef(null);

  useEffect(() => {
    axios.all([user_url, current_user_url, endorsement_url])
    .then(axios.spread((...response) => {
      setUser(response[0].data.data)
      setCurrentUser(response[1].data)
      setEndorsement(response[2].data.data)
    }))
    .catch(response => console.log(response))
  }, [user.length, current_user.length, endorsement.length])


  function handleAddEndor() {
    setDispEndor(!dispEndor)
  }

  function handleSave(e) {
    e.preventDefault();
    const form = endorForm.current
    var jsonObject = {
      endorsee_id: user.id,
      endorser_id: current_user.id,
      rating: form['rating'].value,
      comment: form['comment'].value
    }

    axios.put(`/api/v1/endorsements/${user.id}`, jsonObject)
    .then(
      response => console.log(response),
      location.reload(),
      alert("Endorsement added")
    )
    .catch(response => console.log(response))
  }

  function AddEndor() {
    return(
      <form ref={endorForm}>
        <div class="row">
          <div class="col input-group">
            <input type="text" class="form-control" label={'rating'} name={'rating'} placeholder="Rating" />
            <span class="input-group-text" id="basic-addon2">out of 10</span>
          </div>
          <div class="col">
            <textarea class="form-control" label={'comment'} name={'comment'} placeholder="Comment" rows="3" />
          </div>
          <div class="col">
            <button class="btn btn-outline-success mt-2" onClick={handleSave}>Endorse</button>
          </div>
          <div class="col">
            <button class="btn btn-outline-danger mt-2" onClick={handleAddEndor}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }

  var userName = "";
  var endorseButton = "";
  if (user.length != 0) {
    userName = user.attributes.first_name + " " + user.attributes.last_name
    
    if(user.id != current_user.id) {
      endorseButton = <button type="button" className="btn btn-outline-info" onClick={handleAddEndor}>Endorse</button>
    }
  }

  return ( 
    <div className="card profile-info">
      <div className="card-header">
        <div className="row">
          <div className="col-10">
            <h4>Endorsements</h4>
          </div>
          <div className="col-2">
            {endorseButton}
          </div>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {endorsement.map((endor, index) => {
            return(
              <li className="list-group-item">
                <strong className="lead">Rating: {endor.attributes.rating}</strong>
                <p className="lead">{endor.attributes.comment} <span className="italics">- {endor.attributes.endorser_name}</span></p>
              </li>
            )
          })}
        </ul>
        {
          (dispEndor) ?
            <AddEndor />
          :
            <br />
        }
      </div>
    </div>
  );
}
 
export default Endorsement;
