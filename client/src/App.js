import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUser, isEditor, isViewer, getToken } from './helpers';
import renderHTML from 'react-render-html';

const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API}/posts`,
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                console.log(response)
                setPosts(response.data)
            })
            .catch(error => alert('Error fetching posts'));
    };

    useEffect(() => {
        fetchPosts()
    }, [])

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete this post?');
        if (answer) {
            deletePost(slug);
        }
    };

    const deletePost = slug => {
        axios
            .delete(`${process.env.REACT_APP_API}/post/${slug}`,
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                alert(response.data.message);
                fetchPosts();
            })
            .catch(error => alert('Error deleting post.'));
    };

    const showUpdateDeleteButtons = (post) => (
        <div className="col-md-2">
            <Link
                to={`/post/update/${post.slug}`}
                onClick={() => window.location.href = `/post/update/${post.slug}`}
                className="btn btn-sm btn-outline-warning">
                Update
            </Link>

            <button
                onClick={() => deleteConfirm(post.slug)}
                className="btn btn-sm btn-outline-danger ml-1">
                Delete
            </button>
        </div>
    );

    const showPosts = () => (
        posts.map((post, i) => (
            <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
                <div className="col pt-3 pb-2">

                    <div className="row">

                        <div className="col-md-10">
                            <Link
                                to={`/post/${post.slug}`}
                                onClick={() => window.location.href = `/post/${post.slug}`} >
                                <h2 className='postTitle'>{post.title}</h2>
                            </Link>

                            <div className="lead pt-3">
                                <div className="textPost">
                                    {renderHTML(post.content.substring(0, 10))} ...
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

                        {isEditor() && (
                            showUpdateDeleteButtons(post)
                        )}

                    </div>

                </div>
            </div>
        ))
    );

    return (
        <div className="container pb-5">
            <h1 className="appTitle">POSTING APP</h1>
            <hr />

            {!(isEditor() || isViewer()) &&
                <div className="p-2">
                    <p className="textHello">You are currently not logged in.</p>
                </div>
            }

            {isViewer() &&
                <div className="p-2">
                    <p className="textHello">{`Hi, ${getUser()}!`}</p>
                    <p className="textHello">You are currently logged in as a Viewer.</p>
                </div>
            }

            {isEditor() &&
                <div className="p-2">
                    <p className="textHello">{`Hi, ${getUser()}!`}</p>
                    <p className="textHello">You are currently logged in as an Editor.</p>
                </div>
            }

            <hr />

            {(isEditor() || isViewer()) &&
                showPosts()
            }
        </div>
    );
};

export default App;
