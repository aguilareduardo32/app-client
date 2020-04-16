import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', password: '',phone: '', email: '', rol: ''};
        this.service = new AuthService();
    }

    // handleChange() and handleSubmit() will be added here

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const phone = this.state.phone;
        const email = this.state.email;
        const rol = this.state.rol
            if(this.state.password.length < 8) {
                return   alert('your password needs to be at least 8 characters');
               
            }
        
        
        this.service.signup(username, password, phone, email, rol)
            .then( response => {
                this.setState({
                    username: '',
                    password: '',
                    phone: '',
                    email: '',
                    rol: ''
                }) 
                this.props.history.push("/trip/trips")
                ;
                this.props.getUser(response)
            })
            .catch( error => console.log(error) )
    }

    handleChange = ( event ) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }


    render() {
        return(
           <div>
           <h3>Signup</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input  name="username" type="text" value={this.state.username} onChange={ e => this.handleChange(e)}/>
                    <label>Password:</label>
                    <input name="password" type="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
                    <label>phone:</label>
                    <input name="phone"  type="number" value={this.state.phone} onChange={ e => this.handleChange(e)} />
                    <label>email:</label>
                    <input name="email"   type="string" value={this.state.email} onChange={ e => this.handleChange(e)} />
                    <label>rol:
                    <select name="rol" value={this.state.rol} onChange={e => this.handleChange(e)} >
                        <option value='' disabled>Select role</option>
                        <option name="PILOT" rol="PILOT">PILOT</option>
                        <option name="COPILOT" rol="COPILOT">COPILOT</option>
                    </select>
                    </label>
                
                    <input type="submit" value="Signup" />
                </form>
                <p>Alredy have account?
                    <Link to={'/'}>Login</Link>
                </p>
           </div>
        )
    }
}

export default Signup;