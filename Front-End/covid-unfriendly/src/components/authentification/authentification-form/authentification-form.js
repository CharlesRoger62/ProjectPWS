import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import { useLocation, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import {AuthentificationSchema} from './authentification.schema';
import { Authentification } from '../authentification';
import { Alert, Button } from 'react-bootstrap';

export const AuthentificationForm = (props) => {
    let location = useLocation();
	let history = useHistory();
    const [formData, setFormData] = useState({ email: '' });
	const [success, setSuccess] = useState(false);
	const [first,setFirst] =useState(true);

    const handleChange = (newData) => {
		setFormData(newData);
		setSuccess(false);
	};

	const handleSubmit = () => {
		let auth= Authentification({username: formData.login , password: formData.password});
		if(auth){
			setSuccess(true);
			history.push({
				pathname: '/',
				state: {}
				});
		}
		else {
			setSuccess(false);
		}
		setFirst(false);
	};
        return (
        <Form 
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        schema={AuthentificationSchema} >
			{first ? <></> : success ?  <></> : <Alert> Please retry, hint : login = user , password = user</Alert>}
			<label>{success}</label>
            <div className="form-group">
				<label>Username</label>
				<Field
					className="form-control"
					name="login"
					value={formData.login}
				/>
				<FieldError name="login" />
				<label>Password</label>
                <Field
					className="form-control"
					name="password"
					value={formData.password}
				/>
				<FieldError name="password" />
			</div>
			<Button onClick={handleSubmit}>Se connecter</Button>
        </Form>
        )
    }
    /*else {
        return <div> vous n'êtes pas passé par le bouton</div>
    }*/