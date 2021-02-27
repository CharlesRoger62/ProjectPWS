import { Button } from 'react-bootstrap';
import { useHistory, withRouter } from "react-router-dom";
import { GetAuthentificated } from './authentification';

const AuthentificationButton = () => {
    var history = useHistory();

    const handleOnClick = () => {
        history.push({
            pathname: '/login',
            state: { referrer :'/'}
        });
    }
    return (
        <Button type='button' onClick={handleOnClick}>{GetAuthentificated() ? 'Deconnexion' : 'Connexion'}</Button>
    )
}

export default withRouter(AuthentificationButton);
