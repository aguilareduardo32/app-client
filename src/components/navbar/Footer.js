import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

class Fooot extends Component {
    constructor(props){
        super(props);
        this.state = { loggedInUser: null};
        this.service = new AuthService();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, loggedInUser: nextProps["userInSession"]})
    }
    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.setState({ loggedInUser: null });
            this.props.getUser(null);
        })
    }

    render(){
        if(this.state.loggedInUser){
            return(
                
                    <footer >
                        
                                <Link   to='/'>
                                    <button className="loginsub2" onClick={() => this.logoutUser()}>Logout</button>
                                </Link>
                          
                    </footer>
                
            )
        } else {
            return(
               
                <nav className="nav-style">
                    <ul>
                       
                    
                    </ul>
                </nav>
              
            )
        }
        
    }
}

export default Fooot;