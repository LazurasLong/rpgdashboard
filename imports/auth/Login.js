import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }
    
    onSubmit(e) {
        e.preventDefault();
        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        if (email && password) {
            Meteor.loginWithPassword(email, password, (err) => {
                if (err) {
                    this.setState({
                        error: err.message
                    })
                } else {
                    this.setState({
                        error: ''
                    })
                }
            })
        } else {
            this.setState({
                error: 'Please fill out both form fields!'
            })
        }
    }
    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Login</h3>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <input ref='email' type='email' placeholder='Email'/>
                    <input ref='password' type="password" placeholder='Password'/>
                    <button>Login</button>
                </form>
                <Link to='/signup'>Need an account?</Link>
            </div>
        )
    }
}