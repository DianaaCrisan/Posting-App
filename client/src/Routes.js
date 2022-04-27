import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Create from './Create';
import Nav from './Nav';
import SinglePost from './SinglePost';
import UpdatePost from './UpdatePost';
import Login from './Login';
import PrivateRouteEditor from './PrivateRouteEditor';

const Routes = () => {
    return (
        <BrowserRouter>
            <div className="container p-3">
                <Nav />
                <br />
            </div>
            <Switch>
                <Route path="/" exact component={App} />
                <PrivateRouteEditor path="/create" exact component={Create} />
                <Route path="/login" exact component={Login} />
                <Route path="/post/:slug" exact component={SinglePost} />
                <PrivateRouteEditor path="/post/update/:slug" exact component={UpdatePost} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
