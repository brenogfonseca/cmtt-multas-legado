import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

export const roleAdm = Component => {
    class ComponentBase extends React.Component {
        componentDidMount() {
            this.props.getUser();
            const { history, usuario } = this.props;
            if (usuario === undefined) { return null }
            if (!usuario || !usuario.permissao.includes('ROLE_ADM')) history.replace('/403')
        }
        componentDidUpdate(prevProps) {
            const { history, usuario } = this.props;
            if (
                !usuario ||
                !usuario.permissao.includes('ROLE_ADM')) {
                history.replace('/Acessar');
            }
        }
        render() {
            return (

                <Component {...this.props} />
            )
        }
    }
    const mapStateToProps = state => ({
        usuario: state.auth.usuario
    });
    return connect(mapStateToProps, actions)(ComponentBase)
}

export const roleUsr = Component => {
    class ComponentBase extends React.Component {
        componentDidMount() {
            this.props.getUser();
            const { history, usuario } = this.props;
            if (usuario === undefined) { return null }
            if (!usuario || !usuario.permissao.includes('ROLE_ADM', 'ROLE_USER')) history.replace('/Acessar')
        }
        componentDidUpdate(prevProps) {
            const { history, usuario } = this.props;
            if (
                !usuario ||
                !usuario.permissao.includes('ROLE_ADM', 'ROLE_USER')) {
                history.replace('/Acessar');
            }
        }
        render() {
            return (

                <Component {...this.props} />
            )
        }
    }
    const mapStateToProps = state => ({
        usuario: state.auth.usuario
    });
    return connect(mapStateToProps, actions)(ComponentBase)
}
