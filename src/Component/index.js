import React, {Component} from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './home';
import Login from './login';

export default class Router extends Component {
    render() {
        const PublicRouter=({component:Component, ...rest}) => (
            <Route {...rest} render={(routersProps) => (
                !localStorage.getItem('User')
                ? <Component {...routersProps} />
                    : <Redirect to="/home" />
            )}/>
        );
        const PrivateRouter=({component:Component, ...rest}) => (
            <Route {...rest} render={(routersProps)=>(
                localStorage.getItem('User')
                ? <Component {...routersProps} />
                    : <Redirect to="/login" />
            )} />
        );

        return (
            <BrowserRouter>
                <div>
                    {/*<nav>
                        <Link to="/home">Home</Link> { " | " }
                        <Link to="/login">Login</Link>
                    </nav>*/}
                    <Switch>
                        <PublicRouter exact path="/login" component={Login} />
                        <PrivateRouter exact path="/home" component={Home} />
                        <PrivateRouter exact path="/" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}