import React, {Component} from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import u112Img from '../img/u112.jpg';

export default class home extends Component
{
    user=localStorage.getItem('User');

    constructor(props)
    {
        super(props);
        this.state= {
            arr: []
        };
        
        var pusher = new Pusher('32c679fbef206b43bbda', {
            cluster: 'ap2',
            encrypted: true
        });

        var channel = pusher.subscribe(this.user);
        channel.bind('init', (arr) => {
            this.setState({ arr });
        });
        channel.bind('part', (arr) => {
            this.setState({ arr });
        });

        axios.get(`https://home-static-server.herokuapp.com/api/${this.user}/init`);
    }

    render()
    {
        this.handlePart = (index, key, value) => {
            this.state.arr[index].value=!value;
            axios.post(`https://home-static-server.herokuapp.com/api/${this.user}/part`, this.state.arr);
        };

        return(
            <div style={{ textAlign: 'center' }}>
                <input type="button" onClick={() => {
                    localStorage.removeItem('User');
                    this.props.changeUser('');
                }} value="Logout" />
                <br /><br /><br />

                {this.state.arr.length == 4
                    ?
                    <div align="center" style={{ display: 'inline-block', position: 'relative' }}>
                        <img src={u112Img} style={{position: 'relative', width: 400, height: 400}}/>
                        <input type="button" value={this.state.arr[0].value} onClick={() => this.handlePart(0, this.state.arr[0].key, this.state.arr[0].value)} style={{position: 'absolute', top: '40%', left: '2%', color: this.state.arr[0].value ? 'green' : 'red' }}/>
                        <input type="button" value={this.state.arr[1].value} onClick={() => this.handlePart(1, this.state.arr[1].key, this.state.arr[1].value)} style={{position: 'absolute', top: '50%', right: '2%', color: this.state.arr[1].value ? 'green' : 'red' }}/>
                        <input type="button" value={this.state.arr[2].value} onClick={() => this.handlePart(2, this.state.arr[2].key, this.state.arr[2].value)} style={{position: 'absolute', bottom: '30%', left: '15%', color: this.state.arr[2].value ? 'green' : 'red' }}/>
                        <input type="button" value={this.state.arr[3].value} onClick={() => this.handlePart(3, this.state.arr[3].key, this.state.arr[3].value)} style={{position: 'absolute', bottom: '4%', right: '20%', color: this.state.arr[3].value ? 'green' : 'red' }}/>
                    </div>
                    :
                    <table style={{marginLeft: 'auto', marginRight: 'auto', width: 180}}>
                        <tr>
                            <th>No</th>
                            <th>Action</th>
                        </tr>
                        {
                            this.state.arr.map((dat, index) =>
                                <tr>
                                    <td>{dat.key}</td>
                                    <td>
                                        <input type="button" onClick={() => this.handlePart(index, dat.key, dat.value)}
                                               style={{color: dat.value ? 'green' : 'red'}} value={dat.value}/>
                                    </td>
                                </tr>)
                        }
                        {this.state.arr.length === 0 ? <tr>
                            <td colSpan='2'><i>No connected Pi</i></td>
                        </tr> : ""}
                    </table>
                }
            </div>
        );
    }
}