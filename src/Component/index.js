import React, {Component} from 'react';
import { Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

export default class Router extends Component {
    render() {
        const PublicRouter=({component:Component, ...rest}) => (
            <Route {...rest} render={(routersProps) => (
                true
                    ? <Component {...routersProps} />
                    : <Redirect to="/home" />
            )}/>
        );
        const PrivateRouter=({component:Component, ...rest}) => (
            <Route {...rest} render={(routersProps)=>(
                true
                    ? <Component {...routersProps} />
                    : <Redirect to="/login" />
            )} />
        );

        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <Link to="/home">Home</Link> { " | " }
                        <Link to="/login">Login</Link>
                    </nav>
                    <Switch>
                        <PublicRouter path="/login" component={Login} />
                        <PrivateRouter path="/home" component={Home} />
                        <PrivateRouter path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}