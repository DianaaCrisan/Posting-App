// save login response > (user's name and token) to session storage
export const authenticate = (response, next) => {
    if(window !== 'undefined') {
        sessionStorage.setItem('token', JSON.stringify( response.data.token));
        sessionStorage.setItem('user', JSON.stringify(response.data.name));
        sessionStorage.setItem('role', JSON.stringify(response.data.role));
    }
    next();
};

// access token from session storage
export const getToken = () => {
    if(window !== 'undefined') {
        if(sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'));
        }
        else {
            return false;
        }
    }
};

// access users's name from session storage
export const getUser = () => {
    if(window !== 'undefined') {
        if(sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'));
        }
        else {
            return false;
        }
    }
};

// access users's role from session storage
// check if user is editor
export const isEditor = () => {
    if(window !== 'undefined') {
        if(sessionStorage.getItem('role')) {
            if(JSON.parse(sessionStorage.getItem('role')) === 'editor') {
                return true;
            }
        }
        else {
            return false;
        }
    }
};

// access users's role from session storage
// check if user is viewer
export const isViewer = () => {
    if(window !== 'undefined') {
        if(sessionStorage.getItem('role')) {
            if(JSON.parse(sessionStorage.getItem('role')) === 'viewer') {
                return true;
            }
        }
        else {
            return false;
        }
    }
};

// remove token from session storage
export const logout = next => {
    if(window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
    }
    next();
};