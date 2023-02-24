import React, { Component } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import axios from "axios";


const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const checkPass=RegExp(/^^[A-Za-z]\w{8,31}$/);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
export default class SignupUser extends Component {


    constructor(props) {
        super(props);
          this.state = {
            fullName: null,
            email: null,
            password: null,
            phone: null,
            repassword: null,
            test:"",
            accept:false,
            users:[],
            errors: {
              fullName: '',
              email: '',
              phone: '',
              password: '',
              repassword: '',
            }
          };
          this.users =this.props.users
          console.log( this.users);
        }
        componentDidMount = () =>{
          axios.get("http://localhost:80/react_project/back_end/user.php/users/")
          .then((respone)=>{
            let email = respone.data.map((ele) => {
                  return ele.email
            })
            console.log(email);
              this.setState({
                  users:email
              })
              // setUsers(respone.data)
              console.log(respone.data);
          })
      }
        handleChange = (event) => {
          console.log(event);
          // event.preventDefault();
          const { name, value } = event.target;
  //         let name = event.target.name;
  // let value = event.target.value;
          let errors = this.state.errors;
          switch (name) {
            case 'fullName': 
              errors.fullName = 
                value.length < 5
                  ? 'Full Name must be 5 characters long!'
                  : '';
              break;
              case 'email': 
              errors.email = 
              !validEmailRegex.test(value)
              ? 'Email is not valid!'
              : this.state.users.includes(value) 
              ? 'Email is already has been taken'
              : '' ; 
              break;
              case 'phone': 
                errors.phone = 
                  value.length !== 10
                    ? 'Phone must be 10 characters !'
                    : '';
                break;
            case 'password': 
            this.setState({
              test:value
            })
            errors.password = 
            checkPass.test(value)
            
            // value.length < 8 
  
            ? ''
            : 'Password must be 8 characters long!';
            break;
            case 'repassword': 
            console.log(this.state.test);
              errors.repassword = 
                value !== this.state.test
                  ? 'Confirm Password not match!'
                  : '';
              break;
            default:
              break;
          }
        
          this.setState({errors, [name]: value}, ()=> {
              console.log(errors)
          })
        }
        handleSubmit = (event) => {
          event.preventDefault();
          this.setState({
              accept:true,
  
          })
          const { fullName, email,password,phone } = this.state;
  
  // 
          let errors = this.state.errors;
          if(fullName === null){
              errors.fullName =  'Name is required'
          }
          if(email=== null){
              errors.email =  'email is required'
          }
          if(phone=== null){
              errors.phone =  'phone is required'
          }
          if(password === null){
              errors.password =  'password is required'
          }
   
          this.setState({errors}, ()=> {
              console.log(errors)
          })
  // 
          if(validateForm(this.state.errors)) {
            console.info('Valid Form')
            // let newUser ={fullName:this.state.fullName,email:this.state.email,password:this.state.password}
            // this.users.push(newUser);
            let inputs = {fullName:this.state.fullName,email:this.state.email,phone:this.state.phone,password:this.state.password}
            axios.post("http://localhost:80/react_project/back_end/user.php/save",inputs)
            .then((respone)=>{
                console.log(respone.data);
                window.location.pathname = "/user/login";
            })
    
  
            // localStorage.setItem('users',JSON.stringify(this.users))
          }else{
            console.error('Invalid Form')
          }
          console.log( this.users);
  
        }
  render() {
    const {errors} = this.state;

    return (
      <>
      <Header/>
      <div className='form-wrapper'>
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit} noValidate >

                        <div className='fullName'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                        {errors.fullName.length > 0 && this.state.accept && <span className='error'>{errors.fullName}</span>}
                        </div>

                        <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={this.handleChange} noValidate />
                        {errors.email.length > 0 && this.state.accept && <span className='error'>{errors.email}</span>}
                        </div>

                        <div className='phone'>
                        <label htmlFor="phone">Phone number</label>
                        <input type='number' name='phone' onChange={this.handleChange} noValidate />
                        {errors.phone.length > 0 && this.state.accept && <span className='error'>{errors.phone}</span>}
                        </div>

                        <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={this.handleChange} noValidate />
                        {errors.password.length > 0 && this.state.accept && <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='password'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type='password' name='repassword' onChange={this.handleChange} noValidate />
                        {errors.repassword.length > 0 && this.state.accept && <span className='error'>{errors.repassword}</span>}
                        </div>

                        <div className='info'>
                        <small>Password must be eight characters in length.</small>
                        </div>

                        <div className='submit'>
                        <button>Create</button>
                        </div>
                    </form>
                </div>
      {/* <section className="text-center text-lg-start">
        <style dangerouslySetInnerHTML={{__html: "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  " }} />
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right" style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <form onSubmit={this.handleSubmit}>
           
                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example1" className="form-control" name='fullName' onChange={this.handleChange} />
                      <label className="form-label" htmlFor="form3Example1">Name</label>
                      {errors.fullName.length > 0 && this.state.accept && <span className='error'>{errors.fullName}</span>}

                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3" className="form-control" name='email' onChange={this.handleChange} />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                      {errors.email.length > 0 && this.state.accept && <span className='error'>{errors.email}</span>}

                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4" className="form-control" name='password' onChange={this.handleChange}/>
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                      {errors.password.length > 0 && this.state.accept && <span className='error'>{errors.password}</span>}

                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example5" className="form-control" name='repassword' onChange={this.handleChange} />
                      <label className="form-label" htmlFor="form3Example5">Confirm Password</label>
                      {errors.repassword.length > 0 && this.state.accept && <span className='error'>{errors.repassword}</span>}

                    </div>
                    <div className="form-check d-flex justify-content-center mb-4">
                      <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example33" defaultChecked />
                      <label className="form-check-label" htmlFor="form2Example33">
                        Subscribe to our newsletter
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Sign up
                    </button>
                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f" />
                      </button>
                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google" />
                      </button>
                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter" />
                      </button>
                      <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
            </div>
          </div>
        </div>
      </section> */}
      {/* Section: Design Block */}
      <Footer/>
      </>
    )
  }
}
