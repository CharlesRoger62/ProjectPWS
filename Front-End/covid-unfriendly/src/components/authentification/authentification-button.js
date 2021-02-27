import { Button } from 'react-bootstrap'
import { Authentification, GetAuthentificated, SetAuthentificated } from './authentification';


export const AuthentificationButton = () => {
    return (
        <Button onClick={() => {

        }}>{GetAuthentificated() ? 'Deconnexion' : 'Connexion'}</Button>
    )
}