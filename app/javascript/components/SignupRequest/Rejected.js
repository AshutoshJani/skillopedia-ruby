import React from "react";

const Rejected = () => {
  return(
    <div className="row justify-content-md-center vertical-center">
      <div className="top">
        <div className="text-center cover-header">
          <h2>SKILLOPEDIA</h2>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card mx-auto">
        <img src="assets/denied.png" class="rounded mx-auto d-block mt-4" alt="waiting" />
          <h2 className="text-center mt-4">Sorry your request to join has been denied</h2>
          <div className="card-body">
            <p className="text-center">Your request to join has been denied. If you feel you should be able to join, then please contact the administrator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rejected;