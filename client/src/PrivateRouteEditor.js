import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import { isEditor } from './helpers'

const PrivateRouteEditor = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isEditor() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRouteEditor;