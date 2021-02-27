
export const Authentification = (props) => {
    localStorage.setItem('authentificated', true);
    localStorage.setItem('user_username', 'user');
    localStorage.setItem('admin_username', 'admin');
    localStorage.setItem('user_pass', 'user');
    localStorage.setItem('admin_pass', 'admin');

    if(props.username === localStorage.getItem('user_username')){
        if(props.password === localStorage.getItem('user_pass')){
            return true;
        }
    }

    if(props.username ===localStorage.getItem('admin_username')){
        if(props.username ===localStorage.getItem('admin_pass')){
            return true;
        }
    }
    return false;
}

export const SetAuthentificated = (bool) => {
    localStorage.setItem('authentificated', bool);
}

export const GetAuthentificated = () => {
    localStorage.getItem('authentificated');
}