import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import serviceUp from '../cloudinary/service';
import GoogleLogin from 'react-google-login';
import '../../css/signup.css'
import Background from '../images/carpool.jpg';

const responseGoogle = (response) => {
    console.log(response)
}

var sectionStyle = {
    width: '100%',
    height: '900px',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover' ,
    
    
  
  };

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = { username: '', password: '',phone: '', email: '', rol: '', profilePic: ''};
        this.service = new AuthService();
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        

        const uploadData = new FormData();
        
        uploadData.append("profilePic", e.target.files[0]);
        
        serviceUp.handleUpload(uploadData)
        .then(response => {
           //  console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ profilePic: response.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const phone = this.state.phone;
        const email = this.state.email;
        const rol = this.state.rol;
        const profilePic = this.state.profilePic
            if(this.state.password.length < 8) {
                return   alert('your password needs to be at least 8 characters');
               
            }
            if( !this.state.phone || !this.state.username || !this.state.password || !this.state.phone || !this.state.email || !this.state.rol ){
                return alert('fill all the form ')
            }
           
        
        this.service.signup(username, password, phone, email, rol, profilePic )
            .then( response => {
                this.setState({
                    username: '',
                    password: '',
                    phone: '',
                    email: '',
                    rol: '',
                    profilePic: ''
                    
                }) 
                this.props.history.push("/trips")
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
           <div style={ sectionStyle }>
           <h3>Signup</h3>
                <form class="signup-form" onSubmit={this.handleFormSubmit} >
                <br/>
                <br/>
                    <label> Profile pic: </label>
                    <br/>
                    <br/>
                    <input 
                    class="profileTag"
                    type="file" 
                    name="profilePic"
                    
                    onChange={ (e) => this.handleFileUpload(e)} /> 
                    <br/>
                    <br/>
                    <label>Username: </label>
                    <input class="w3-input" name="username" type="text" value={this.state.username} onChange={ e => this.handleChange(e)}/>
                    <br/> <br/>
                    <label>Password: </label>
                    <input class="w3-input" name="password" type="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
                    <br/> <br/>
                    <label>phone: </label>
                    <input class="w3-input" name="phone"  type="number" value={this.state.phone} onChange={ e => this.handleChange(e)} />
                    <br/> <br/>
                    <label>email: </label>
                    <input class="w3-input" name="email"   type="string" value={this.state.email} onChange={ e => this.handleChange(e)} />
                    <br/> <br/>
                    <label>rol <br/>
                    <select name="rol" value={this.state.rol} onChange={e => this.handleChange(e)} >
                        <option value='' disabled>Select role</option>
                        <option name="PILOT" rol="PILOT">PILOT</option>
                        <option name="COPILOT" rol="COPILOT">COPILOT</option>
                    </select>
                    </label>
                    <br/> <br/>
                    <input  className="loginsub" type="submit" value="Signup" />
                </form>
                <br/> <br/>
                <GoogleLogin
                    
                    clientId="986930867229-7enoctj4mv34n4rlhrnr3s920e7b1tjc.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br/> <br/>
                <p>Alredy have account? 
                <br/> <br/>
                    <Link className="loginsub2" to={'/'}>Login</Link>
                </p>
           </div>
        )
    }
}

export default Signup;