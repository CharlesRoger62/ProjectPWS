import React,{useState} from 'react';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
var nodemailer = require('nodemailer');
export const ContactForm= () => {
    //if doesn"t work add set
    const [nom] = useState("")
    const [prenom] = useState("")
    const [mail] = useState("")
    const [commentaire] = useState("")

    const handleSubmit = () => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    return(
        <form onSubmit={handleSubmit}>
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
        </form>
        );
}