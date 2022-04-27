import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { authenticate, getUser } from './helpers';

const Login = () => {
    // create a state
    const [state, setState] = useState({
        name: '',
        password: ''
    });

    const { name, password } = state;

    useEffect(() => {
        if (getUser()) {
            window.location="/";
        }
    }, [])

    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({ name, password });

        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then(response => {
                console.log(response)

                // response will contain the token and the name 
                // redirect to create page
                authenticate(response, () => window.location="/");
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return <div className="container pb-5">
        <h1 className="textPost">LOGIN</h1>
        <br />

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="textPost">Name</label>
                <input
                    onChange={handleChange('name')}
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    style={{'background-color':'rgba(0,0,0, 0.2)', 'color': 'white'}}
                    required />
            </div>

            <div className="form-group">
                <label className="textPost">Password</label>
                <input
                    onChange={handleChange('password')}
                    value={password}
                    type="password"
                    className="form-control"
                    placeholder="Your password"
                    style={{'background-color':'rgba(0,0,0, 0.2)', 'color': 'white'}}
                    required />
            </div>

            <div>
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
    </div>;
};

export default Login;