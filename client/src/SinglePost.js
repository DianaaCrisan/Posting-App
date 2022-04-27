import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from './helpers';
import renderHTML from 'react-render-html';

const SinglePost = (props) => {
    const [post, setPost] = useState('');

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`,
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => setPost(response.data))
            .catch(error => alert('Error loading single post'));
    }, [props.match.params.slug]);

    const showSinglePost = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2 pt-3 pb-2">
                <h1 className="singlePostTitle">{post.title}</h1>
                <div className="lead pt-3">
                    <div className="textPost">
                        {renderHTML(post.content)}
                    </div>
                </div>
                <p className="textPost">
                    Autor
                    <span className="badge">{post.user}</span>
                    Published on {' '}
                    <span className="badge">
                        {new Date(post.createdAt).toLocaleString()}
                    </span>
                </p>

            </div>
        </div>
    )

    return (
        <div className="container pb-5">
            {post && showSinglePost()}
        </div>
    )
};

export default SinglePost;