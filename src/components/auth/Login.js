import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

import '../../css/login.css';
import Background from '../images/carpool.jpg';

var sectionStyle = {
    width: '100%',
    height: '900px',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover' ,
    
    
  
  };
  

class Login extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', password: ''};
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.service.login(username, password)
        .then( response => {
            this.setState({ username: '', password: ''});
            this.props.getUser(response)
            this.props.history.push('/trip/trips')
        })
        .catch( error =>  {return alert('check password and user')})
    }

    handleChange = (event) => {
        const { name, value} = event.target;
        this.setState({[name]: value})
    }


    render(){
        return(
            <section  style={ sectionStyle }>

               
                
                <br/>
                        <form class="login-form" onSubmit={this.handleFormSubmit}>
                        <h1>Login</h1><br/>
                            <label>Username:   </label>
                            <input  class="w3-input" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/><br/><br/>
                            <label>Password: </label>
                            <input class="w3-input" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} /><br/>
                            <br/><input className="loginsub" type="submit" value="Login"/>
                        </form><br/>
                        
                            <p>Don't have account? 
                            <br/><br/>
                <Link  style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2" to={"/signup"}> Signup</Link>
                </p>
               
                </section>
        )
    }
}

export default Login;