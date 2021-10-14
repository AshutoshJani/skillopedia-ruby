import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users/Users";
import User from "../components/User/User";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Users} />
      <Route exact path="/users/:id" component={User} />
    </Switch>
  </Router>
);