import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { GetAuthentificated } from './authentification';

export const AuthentificationButton = () => {
    let history=useHistory();

    return (
        <Button onClick={() => {
            history.push({
                    pathname: '/login',
                    state: { referrer :'/'}
                });

        }}>{GetAuthentificated() ? 'Deconnexion' : 'Connexion'}</Button>
    )
}