import React from "react";
import { Redirect, Route } from "react-router-dom";
import Dashboard from "../components/DashBoard";
import { isAuthenticated } from "./dados";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        // isAuthenticated() ? <Dashboard> {children} </Dashboard> : <Redirect to='/Acessar' />
        <Dashboard> {children} </Dashboard>
      )}
    />
  );
}
