import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {AuthentificationSchema} from './authentification.schema';
import { getAuthentification } from '../authentification';
import { Button } from 'react-bootstrap';

export const AuthentificationForm = (props) => {
    let location = useLocation();
    const [formData, setFormData] = useState({ email: '' });
	const [success, setSuccess] = useState(false);

    const handleChange = (newData) => {
		setFormData(newData);
		setSuccess(false);
	};

	const handleSubmit = () => {
		setSuccess(true);
	};
        return (
        <Form 
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        schema={AuthentificationSchema} >
            <div className="form-group">
				<label>Email :</label>
				<Field
					className="form-control"
					name="login"
					value={formData.login}
				/>
				<FieldError name="login" />
                <Field
					className="form-control"
					name="password"
					value={formData.password}
				/>
				<FieldError name="password" />
			</div>
			<Button type='submit'>Se connecter</Button>
        </Form>
        )
    }
    /*else {
        return <div> vous n'êtes pas passé par le bouton</div>
    }*/