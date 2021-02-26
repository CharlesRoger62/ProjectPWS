import React,{useEffect, useReducer, useState} from 'react';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import {contactSchema} from './contact-form.schema';
import {defaultMessage, minCommentCustomMessage , maxCommentCustomMessage } from './contact-error-form.messages';
import Submit from './submit';
import {
	Col,
	FormGroup,
	Input,
	Label,
	Row,
  Alert
} from 'reactstrap';
import {AuthContext} from '../../context/AuthContext/auth-context';
import './contact-form.css';
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const axios =require('axios');

export const ContactForm= () => {
  //remplacer les input par le composant React bootstrap avec {Input}
    const [formData, setFormData] = useState({ nom : '' , prenom: '',  mail: '', comment : '', sujet : '', 
    defaultMessage, minCommentCustomMessage, maxCommentCustomMessage });
    const [visible,setVisible] = useState(new Map());
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adminAuth,setAdminAuth] = useState(false);
    const [dec,setDec] =useState('');
    const [transporter,setTransporter] = useState({});
    const [mailOptions,setMailOptions] = useState({});
    const initialState = {
      loading: "",
      error: "",
      data: []
    };
    const [data, dispatch] = useReducer(apiReducer, initialState);

    function apiReducer(state, action) {
      switch (action.type) {
        case "LOADING":
          return { ...state, loading: "yes" };
        case "LOADING_FINISHED":
          return {...state, loading: "no" };                 
        case "DATA_FETCH_SUCCESS":
          return { ...state, loading: "", data: action.payload };
        case "DATA_FETCH_FAILURE":
          return { ...state, loading: "", error: action.payload };
        default:
          return state;
      }
    }

    useEffect(() => {
      dispatch({ type: "LOADING" });
      
      function handleDecChange(string) {
        setDec(string);
      }
      
      if(adminAuth===true){
        var algorithm = 'aes256';
        var password = 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3';
        var decipher;
        decipher= crypto.createDecipher(algorithm,password);
        axios.get('http://localhost:9428/api/protectedservice/getpassword/0853748342608242e9733972676847f').then( res => 
          handleDecChange('' + decipher.update(res ,'hex','utf8') + decipher.final('utf8')))
          .then(json => {
            dispatch({ type: "DATA_FETCH_SUCCESS", payload: json });
          })
          .catch(error => {
            dispatch({ type: "DATA_FETCH_FAILURE", payload: error.message });
          }); 
      };
      
    }, [adminAuth, dec])

    useEffect(() => {
      function handleVisibleChange(map){
          let newmap=new Map();
          newmap.set('e0',false);
          newmap.set('e1',false);
          newmap.set('e2',false);
          setVisible(newmap);
      }

      handleVisibleChange();
    }, [])

    const sendMail = () =>{
      if(adminAuth === true){
        setTransporter(nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ayoubmekouar@gmail.com',
            pass: dec
          }
        }));

        setMailOptions({
          from: formData.mail,
          to: 'ayoubmekouar@gmail.com',
          sujet: formData.sujet,
          text: formData.comment
        });

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    }

    const handleSubmit = () => {
      if((loading===false)){
        setLoading(true);
        setLoading(false);
      }
      if(success === false)
        setSuccess(true);
      if(success === true )
        sendMail();
      let newMap=new Map();
      for (let i=0 ;i<=2;i++){
        newMap.set('e'+i,true);
      } 
      setVisible(newMap);
    }

    
    const handleChange = (newData) => {
      if(newData !== data){
        setFormData(newData);
      }
    setSuccess(false);
    }
    return(<>
    <Form 
        schema={contactSchema}
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errorMessages={{
          required: () => formData.defaultMessage,
        }}
        className="comp-height large"
        >
        <FieldError name="*">
					<Alert color="danger">
						Errors were found in the form. Please fill out all the required fields.
					</Alert>
				</FieldError>
        <FormGroup className={visible.get('e0'=== true) ? "row showed" : "row disabled"}>
				<Label className="col-md-4" htmlFor="client-minCommentCustomMessage">minimum comment error message</Label>
				<Col md="6">
					<Field
						component={Input}
						id="client-minCommmentCustomMessage"
						name="minCommentCustomMessage"
						type="text"
						value={formData.minCommentCustomMessage}
					/>
					</Col>
				</FormGroup>
        <FormGroup className={visible.get('e1'=== true) ? "row showed" : "row disabled"}>
					<Label className="col-md-4" htmlFor="client-maxCommentCustomMessage">maximum comment error message</Label>
					<Col md="6">
						<Field
							component={Input}
							id="client-maxCommentCustomMessage"
							name="maxCommentCustomMessage"
							type="text"
							value={formData.maxCommentCustomMessage}
						/>
					</Col>
				</FormGroup>
        <FormGroup className={visible.get('e2'=== true) ? "row showed" : "row disabled"}>
					<Label className="col-md-4" htmlFor="client-defaultMessage">required message error</Label>
					<Col md="6">
						<Field
							component={Alert}
              variant="danger"
							id="client-defaultMessage"
							name="defaultMessage"
							type="text"
							value={formData.defaultMessage}
              dismisible="true"
						/>
					</Col>
				</FormGroup>
        <hr />
        <FormGroup className="row mb-5">
					<Label className="col-md-4" htmlFor="client-nom">Nom :</Label>
					<Col md="6">
						<Field
							component={Input}
							id="client-nom"
							name="nom"
							type="text"
							value={formData.nom}
						/>
            <FieldError name="nom" />
					</Col>
				</FormGroup>
        <FormGroup className="row mb-5">
					<Label className="col-md-4" htmlFor="client-prenom">Prénom :</Label>
					<Col md="6">
						<Field
							component={Input}
							id="client-prenom"
							name="prenom"
							type="text"
							value={formData.prenom}
						/>
            <FieldError name="prenom" />
					</Col>
				</FormGroup>
        <FormGroup className="row mb-5">
					<Label className="col-md-4" htmlFor="client-mail">E-Mail :</Label>
					<Col md="6">
						<Field
							component={Input}
							id="client-mail"
							name="mail"
							type="text"
							value={formData.mail}
						/>
            <FieldError name="mail" />
					</Col>
				</FormGroup>
        <Label className="col-md-4" htmlFor="client-sujet">Sujet :</Label>
        <FormGroup className="row mt-5 large">
					<Col md="6">
						<Field
							component={Input}
							id="client-sujet"
							name="sujet"
							type="text"
              className="sujet-field"
							value={formData.sujet}
              placeholder="ceci est non requis"
						/>
            <FieldError name="sujet" />
          </Col>
        </FormGroup>
        <Label className="col-md-4" htmlFor="client-CommentCustom">Commentaire :</Label>
				<FormGroup className="row mt-5">
					<Col md="6">
						<Field
							component={Input}
							id="client-CommentCustom"
							name="CommentCustom"
							type="textarea"
              className="form-control comment-field"
							value={formData.comment}
              placeholder="Les critiques constructives sont toujours appréciées"
              
						/>
						<FieldError
							errorMessages={{
								minimum: () => formData.minCommentCustomMessage,
								maximum: () => formData.maxCommentCustomMessage,
							}}
							name="CommentCustom"
						/>
					</Col>
        </FormGroup>
        <Row className="mb-4">
				<Col md="10" className="text-center">
					<Submit loading={loading} success={success} />
				</Col>
				</Row>
      </Form>
      </>
    );
        /* Version sans la Lib : <form onSubmit={handleSubmit}>
            <label>
                Nom :
            <input type ='text' value={nom} placeholder='Enchanté'></input>
            </label>
            <label>
                Prenom :
            <input type ='text' value={prenom} placeholder='Mr/Mme Untel(le)'></input>
            </label>
            <label>
                E-Mail :
            <input type ='text' value={mail} placeholder="N'oubliez pas l'arobase et le point"></input>
            </label>
            <label>
                Votre commentaire :
            <textarea type ='text' value={commentaire} placeholder='Votre commentaire...'></textarea>
            </label>
            <input type="submit" value="Envoyer" />
        </form>*/
}

/*<></>
<AuthContext.Consumer>
        {'admin' ? setAdminAuth(true) : setAdminAuth('') } 
      </AuthContext.Consumer>
      */