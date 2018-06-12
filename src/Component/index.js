import React, {Component} from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './home';
import Login from './login';

export default class Router extends Component {
    constructor()
    {
        super();
        this.state={
            user: localStorage.getItem("User")
        };
        console.log(this.state.user);
    }

    changeUser = (user)=>{
        this.setState({ user });
    };

    render() {
        const PublicRouter=({component:Component, ...rest}) => (
            <Route {...rest} render={(routersProps) => (
                !this.state.user
                ? <Component {...routersProps} changeUser={this.changeUser} />
                    : <Redirect to="/home" />
            )}/>
        );
        const PrivateRouter=({component:Component, ...rest}) => (
            <Route {...rest} render={(routersProps)=>(
                this.state.user
                ? <Component {...routersProps} user={this.state.user} changeUser={this.changeUser} />
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
                        <PublicRouter exact path="/" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}