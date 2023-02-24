import React, { Component } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import axios from "axios";



export default class LoginUser extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            users:[],
        }
        this.users =this.props.users
        console.log( this.users);
    }

    componentDidMount = () =>{
        axios.get("http://localhost:80/react_project/back_end/user.php/users/")
        .then((respone)=>{
            this.setState({
                users:respone.data
            })
            // setUsers(respone.data)
            console.log(respone.data);
        })
    }
    handleBlur = (event)=>{

    const {name , value}=event.target;

if(name==="email"){
    this.setState({
        email:value,
    })
    
}else if(name==="password"){
    this.setState({
        password:value,
    })
    
}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.users);
        if (this.state.email==="" || this.state.password==="" ){
            document.getElementById("err").style.display = 'block'
            document.getElementById("err").innerHTML = "**please inter your email and password"
        }
        this.state.users.map((ele)=>{
        if (ele.email!==this.state.email && ele.password!==this.state.password){
            document.getElementById("err").style.display = 'block'
            document.getElementById("err").innerHTML = "**please inter correct your email and password"
        }
    })
        this.state.users.map((ele)=>{
            if(ele.email===this.state.email && ele.password===this.state.password && this.state.email!=="" && this.state.password !==""){
                  console.log(true);
                  window.localStorage.setItem('email',this.state.email)
                  window.localStorage.setItem('id',ele.id)

                  window.location.assign('/home')

                  

            }
         
        })
        // const {name , value}=event.target;

        
        
        
    }
  render() {
    return (
      <>
      <Header/>
      <div className='form-wrapper'>
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit} noValidate >

                   

                        <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onBlur={this.handleBlur} noValidate />
                        </div>

                        <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onBlur={this.handleBlur} noValidate />
                        <p className="errorr" id="err"></p>

                        </div>


                        <div className='submit'>
                        <button>Login</button>
                        </div>
                    </form>
                </div>
      <Footer/>
      </>
    )
  }
}
