import { Button } from 'react-bootstrap'
import { Authentification, GetAuthentificated, SetAuthentificated } from './authentification':


export const AuthentificationButton = () => {
    return (
        <Button onClick={() => {
            <Redirect
                to={{
                    pathname: "/login",
                    state: { referrer: "/auth" }
                }}
/>
        }}>{GetAuthentificated() ? Deconnexion : Connexion}</Button>
    )
}