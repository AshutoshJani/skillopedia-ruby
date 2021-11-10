import React from "react";

const Waitlist = () => {
  return(
    <div className="row justify-content-md-center vertical-center">
      <div className="top">
        <div className="text-center cover-header">
          <h2>SKILLOPEDIA</h2>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="card mx-auto">
        <img src="assets/clipboard.png" class="rounded mx-auto d-block mt-4" alt="waiting" />
          <h2 className="text-center mt-4">Almost There!</h2>
          <div className="card-body">
            <p className="text-center">You will be able to login once your request to signup has been verified or approved by the administrator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Waitlist;