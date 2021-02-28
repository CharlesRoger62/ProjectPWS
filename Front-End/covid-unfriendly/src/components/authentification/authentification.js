
export const Authentification = (props) => {
    localStorage.setItem('authentificated', true);
    localStorage.setItem('user_username', 'user');
    localStorage.setItem('admin_username', 'admin');
    localStorage.setItem('user_pass', 'user');
    localStorage.setItem('admin_pass', 'admin');

    if(props.username.toUpperCase === localStorage.getItem('user_username').toUpperCase){
        if(props.password.toUpperCase === localStorage.getItem('user_pass').toUpperCase){
            return true;
        }
    }

    if(props.username.toUpperCase ===localStorage.getItem('admin_username').toUpperCase){
        if(props.username.toUpperCase ===localStorage.getItem('admin_pass').toUpperCase){
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