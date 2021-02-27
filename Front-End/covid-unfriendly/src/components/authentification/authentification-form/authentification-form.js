import { Field, FieldError, Form } from 'react-jsonschema-form-validation';

export const AuthentificationForm = (props) => {

    if(props.location.state.referrer === "/auth"){
        return (
        <Form>

        </Form>
        );
    }
    else {
        return <div> vous n'êtes pas passé par le bouton</div>
    }

}