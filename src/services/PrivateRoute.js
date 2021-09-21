import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Dashboard from '../components/DashBoard'

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={() =>
      localStorage.getItem('CMTTSIS') ? <Dashboard> {children} </Dashboard> : <Redirect to='/Acessar' />
    } />
  )
}
