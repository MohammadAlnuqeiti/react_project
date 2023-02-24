import React from 'react'
import Header from '../component/layout/header';
import Footer from '../component/layout/footer';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Contact() {

    const navigate=useNavigate();

    const [inputs,setInputs]=useState({})
    const [errorname,setErrorsname]=useState(false)
    const [erroremail,setErrorsemail]=useState(false)
    const [errorsubject,setErrorssubject]=useState(false)
    const [errormessage,setErrorsmessage]=useState(false)
    const [accept,setAccept]=useState(false)

    const handleBlur = (event) => {
        const {name , value} = event.target;
console.log(accept);
switch (name) {
    case 'name': 
    let x =
    value.length === 0 
    ? setErrorsname('Name is required!')
    : setErrorsname(true);
    break;
    case 'email': 
    let y =
    value.length === 0
            ? setErrorsemail('Email is required!')
            : setErrorsemail(true);
            break;
            case 'subject': 
            let z =
            value.length === 0
            ? setErrorssubject('Subject is required!')
            : setErrorssubject(true);
            break;
            case 'message': 
            let m =
            value.length === 0
            ? setErrorsmessage('Message is required!')
            : setErrorsmessage(true);
            break;
            default:
                break;
            }
            setInputs(values => ({...values,[name]:value}))
            
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setAccept(true);
        if(errorname === false){
            setErrorsname('Name is required!')
                }
            
        if(erroremail === false){
            setErrorsemail('Email is required!')
                }
            
        if(errorsubject === false){
            setErrorssubject('Subject is required!')
                }
            
        if(errormessage === false){
            setErrorsmessage('Message is required!')
                }
    

// const [name,setName]=useState("")
// const [email,setEmail]=useState("")
// const [subject,setSubject]=useState("")
// const [message,setMessage]=useState("")
if(errorname ===true && errorname ===true && errorsubject===true && errormessage===true ){
    axios.post("http://localhost:80/react_project/back_end/contact.php/save",inputs)
    .then((respone)=>{
        console.log(respone.data);
        // navigate('/');
    })
}

    }
  return (
    <>
        <Header/>
        <div className="container-fluid px-5 my-5">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0 rounded-3 shadow-lg overflow-hidden">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-sm-6 d-none d-sm-block bg-image" />
                  <div className="col-sm-6 p-4">
                    <div className="text-center">
                      <div className="h3 fw-light">Contact Form</div>
                      <p className="mb-4 text-muted">Split layout contact form</p>
                    </div>
                    {/* * * * * * * * * * * * * * *
          // * * SB Forms Contact Form * *
          // * * * * * * * * * * * * * * *

          // This form is pre-integrated with SB Forms.
          // To make this form functional, sign up at
          // https://startbootstrap.com/solution/contact-forms
          // to get an API token!
          */}
                    <form id="contactForm" onSubmit={handleSubmit}>
                      {/* Name Input */}
                      <div className="form-floating mb-3">
                        <input className="form-control" id="name" type="text" placeholder="Name"  name="name" onBlur={handleBlur} />
                        <label htmlFor="name">Name</label>
                        {accept && <p style={{color:"red"}}>{errorname}</p>}
                      </div>
                      {/* Email Input */}
                      <div className="form-floating mb-3">
                        <input className="form-control" id="emailAddress" type="email" placeholder="Email Address"  name="email" onBlur={handleBlur} />
                        <label htmlFor="emailAddress">Email Address</label>
                        {accept && <p style={{color:"red"}}>{erroremail}</p>}
                      </div>
                      {/* Subject Input */}
                      <div className="form-floating mb-3">
                        <input className="form-control" id="name" type="text" placeholder="Subject"  name="subject" onBlur={handleBlur}  />
                        <label htmlFor="name">Subject</label>
                        {accept && <p style={{color:"red"}}>{errorsubject}</p>}
                      </div>
                      {/* Message Input */}
                      <div className="form-floating mb-3">
                        <textarea className="form-control" id="message" type="text" placeholder="Message" style={{height: '10rem'}} defaultValue={""} name="message" onBlur={handleBlur} />
                        <label htmlFor="message">Message</label>
                        {accept && <p style={{color:"red"}}>{errormessage}</p>}

                      </div>
                      {/* Submit button */}
                      <div className="d-grid">
                        <button className="btn btn-primary btn-lg" id="submitButton" type="submit">Submit</button>
                      </div>
                    </form>
                    {/* End of contact form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    
    </>
  )
}
