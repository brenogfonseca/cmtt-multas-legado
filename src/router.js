import React from "react";
import App from "./App";
import { isAuthenticated } from "./services/dados";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Acessar from "./components/Acessar";
import Pagina404 from "./Pagina404"
import CMTT from './CMTT'
const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={

            props =>
                isAuthenticated() ? (
                    < Component {...props} />

                ) : (
                    <Redirect
                        to={{ pathname: "/Acessar", state: { from: props.location } }}
                    />
                )

        }
    />
);
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/Acessar" component={Acessar} />
            <Route path="/cmtt" component={CMTT} />
            <Route path='*' component={Pagina404} />
        </Switch>
    </BrowserRouter>
);
export default Routes;

