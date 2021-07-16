import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from '../components/DashBoard'

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={() => <Dashboard> {children} </Dashboard>
    } />
  )
}
