import React, {Component} from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

export default class home extends Component
{
    user=localStorage.getItem('User');
    arr = [];

    constructor()
    {
        super();
        var pusher = new Pusher('32c679fbef206b43bbda', {
            cluster: 'ap2',
            encrypted: true
        });

        var channel = pusher.subscribe(this.user);
        channel.bind('init', function (data) {
            this.arr = data;
        });
        channel.bind('part', (data) => {
            this.arr = data;
        });

        axios.get(`https://home-static-server.herokuapp.com/api/${this.user}/init`);
    }

    render()
    {
        this.handlePart = (index, key, value) => {
            this.arr[index].value=!value;
            axios.post(`https://home-static-server.herokuapp.com/api/${this.user}/part`, this.arr);
        };

        return(
            <div>
                <table border='1'>
                    <tbody>
                    <tr>
                        <th>No</th>
                        <th>Action</th>
                    </tr>
                    {
                        this.arr.map((dat, index) =>
                            <tr>
                                <td>{dat.key}</td>
                                <td><button onClick={() => this.handlePart(index, dat.key, dat.value)} style={{color: dat.value?'green':'red'}}>
                                    {dat.value}
                                    </button>
                                </td>
                            </tr>)
                    }
                    {this.arr.length===0?<tr><td colSpan='2'><i>No connected Pi</i></td></tr>:""}
                    </tbody>
                </table>
            </div>
        );
    }
}