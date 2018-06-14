import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class login extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            username: 'Vishnu',
            password: 'Vishnu123'
        };
    }

    checkAuthentication()
    {
        axios.post('https://vishnumavawala.000webhostapp.com/Home/login.php', JSON.stringify(this.state))
            .then((res) => {
                if(res.data.status==="Successful") {
                    this.setState({ username: '', password: ''});
                    {/*<Redirect to="/home" />*/}
                    localStorage.setItem('User', res.data.user);
                    this.props.changeUser(res.data.user);
                }
                else
                    alert('Invalid Username & Password.');
            })
            .catch((err) => {
                console.log("err", err)
            });
    }

    render() {
        return (
            <div style={{ margin: 'auto', textAlign: 'center', width: '30%' }}>
                <br /><br />
                <div>
                    <b><h1 style={{ color: 'blue' }}>Home Automation</h1></b>
                </div>
                <br /><br />
                <input type='text' className="form-control" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="Enter Username..." /><br />
                <input type='password' className="form-control" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Enter Password..." /><br />
                <input type='button' className="btn btn-primary" value="Login" onClick={() => { this.checkAuthentication() }} />
            </div>
        );
    }
}