import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class login extends Component {
    constructor()
    {
        super();
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
                    <Redirect to="/home" />
                    localStorage.setItem('User', res.data.user);
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
            <div>
                <input type='text' value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="Enter Username..." /><br />
                <input type='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Enter Password..." /><br />
                <input type='button' value="Login" onClick={() => { this.checkAuthentication() }} />
            </div>
        );
    }
}