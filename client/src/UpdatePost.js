import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from './helpers';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';


const UpdatePost = (props) => {
    const [state, setState] = useState({
        title: '',
        slug: '',
        user: '',
    });

    const [content, setContent] = useState('');
    
    // rich text editor handle change
    const handleContent = event => {
        setContent(event);
    };
    
    const { title, slug, user } = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`,
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                const { title, content, slug, user } = response.data;
                setState({ ...state, title, slug, user });
                setContent(content);
            })
            .catch(error => alert('Error loading single post'));
    }, [props.match.params.slug]);

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({ title, content, user });

        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`,
                { title, content, user },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                console.log(response)
                const { title, content, slug, user } = response.data;

                // empty the state
                setState({ ...state, title, content, slug, user });

                // show success alert
                alert(`Post titled ${(title)} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });

        window.location.href = "/";
    }

    const showUpdateForm = () => (
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
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    )

    return (
        <div className="container pb-5">
            <h1 className="textPost">UPDATE POST</h1>
            <br />
            {showUpdateForm()}
        </div>
    )
};

export default UpdatePost;