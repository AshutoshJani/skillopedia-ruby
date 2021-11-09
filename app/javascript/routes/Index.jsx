import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "../components/Users/Users";
import User from "../components/User/User";
import Waitlist from "../components/SignupRequest/Waitlist";
import Rejected from "../components/SignupRequest/Rejected";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Users} />
      <Route exact path="/users/:id" component={User} />
      <Route exact path="/waiting" component={Waitlist} />
      <Route exact path="/rejected" component={Rejected} />
    </Switch>
  </Router>
);