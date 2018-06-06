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
        /*const myApi = axios.create({
            baseURL: 'https://vishnumavawala.000webhostapp.com/Home/login.php',
            timeout: 10000,
            withCredentials: true,
            transformRequest: [(data) => JSON.stringify(data.data)],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: this.state
        });

        axios({
            method: 'post',
            url: 'https://vishnumavawala.000webhostapp.com/Home/login.php',
            data: this.state
        });
        axios.request(myApi);*/
        axios.post('https://vishnumavawala.000webhostapp.com/Home/login.php', this.state)
            .then((res) => {
                debugger;
                if(res.data.status=="Successful") {
                    this.setState({ username: '', password: ''});
                    <Redirect to='/home'  />
                }
                else
                    alert('Invalid Username & Password.');
            })
            .catch((err) => {
                debugger;
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