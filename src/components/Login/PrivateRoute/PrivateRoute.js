import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { context } from '../../../App';

const PrivateRoute = ({ children, ...rest }) => {

    const { loggedInUser, loading } = useContext(context);

    return (
        <>
        {loading?'Loading...'
        :<Route
        {...rest}
        render={({ location }) =>
            loggedInUser.email ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />}
        </>
    );
};

export default PrivateRoute;