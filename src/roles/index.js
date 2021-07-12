import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { parseJwt, token } from '../services/dados'


import { connect } from 'react-redux';
import * as actions from '../actions'



function PrivateRouteADM({ component: Children, ...rest }) {
    var teste = parseJwt(token);
    if (teste === null || teste === undefined) {
        return <Redirect to='/' />
    }
    return (
        <Route {...rest} render={props =>
            teste.permissao === 'ROLE_USER' ? <Children {...props} /> : <Redirect to='/' />
        }
        />
    )
}




const mapStateToProps = state => ({
    usuario: state.auth.usuario
})
export default connect(mapStateToProps, actions)(PrivateRouteADM)