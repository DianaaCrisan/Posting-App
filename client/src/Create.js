import React, { useState } from 'react';
import axios from 'axios';
import { getUser, getToken } from './helpers';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        user: getUser()
    })

    const [content, setContent] = useState('');
    
    // rich text editor handle change
    const handleContent = event => {
        setContent(event);
    };

    // destructure values from the state
    const { title, user } = state;

    // onChange event handler
    const handleChange = (name) => (event) => {
        // console.log('Name: ', name, 'Event: ', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({ title, content, user });

        axios
            .post(`${process.env.REACT_APP_API}/post`,
                { title, content, user },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                console.log(response)

                // empty the state
                setState({ ...state, title: '', user: '' });
                setContent('');

                // show success alert
                alert(`Post titled ${(response.data.title)} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });

        window.location.href = "/";
    }

    const showCreateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="textPost">Title</label>
                <input
                    onChange={handleChange('title')}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Post title"
                    style={{'background-color':'rgba(0,0,0, 0.2)', 'color': 'white'}}
                    required 
                />
            </div>

            <div className="form-group">
                <label className="textPost">Content</label>
                <ReactQuill
                    onChange={handleContent}
                    value={content} 
                    theme="bubble"
                    className="pb-5 mb-3"
                    placeholder="Write something ..."
                    required
                    style={{ 'border': '1px solid white', 'border-radius': '5px', 'background-color':'rgba(0,0,0, 0.2)', 'color': 'white'}} 
                />
            </div>

            <div className="form-group">
                <label className="textPost">User</label>
                <input
                    onChange={handleChange('user')}
                    value={user}
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    style={{'background-color':'rgba(0,0,0, 0.2)', 'color': 'white'}}
                    required 
                />
            </div>

            <div>
                <button className="btn btn-primary">Create</button>
            </div>
        </form>
    )

    return (
        <div className="container pb-5">
            <h1 className="textPost">CREATE POST</h1>
            <br />
            {showCreateForm()}
        </div>
    );
};

export default Create;
