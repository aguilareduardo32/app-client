import React, { Component} from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import TripDetails from './components/Trips/TripDetails';
import TripList from './components/Trips/TripList';
import Navbar from './components/navbar/Navbar';
import Fooot from './components/navbar/Footer';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';
import AddTrip from './components/Trips/AddTrip';
import Background1 from './components/images/carpool1.jpg';
require('dotenv').config()


var sectionStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${Background1})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover' ,
  
  

};

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null){
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch( err => {
          if(err){

          
          this.setState({
            loggedInUser: false
          })
        }
        })
    }
  }
  logoutUser = () => {
    this.service.logout()
    .then(() => {
        this.setState({ loggedInUser: null });
       
    })
}

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    this.fetchUser()
      if(this.state.loggedInUser){
        return (
          <div className="App" style={ sectionStyle }>
            <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
            
            <Switch>
            <Route exact path='/login' render={props => <Login {...props} getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path="/trip/create" component={AddTrip}/>
              <ProtectedRoute user={this.state.loggedInUser} path="/trip/trips" component={TripList}/>
              <ProtectedRoute user={this.state.loggedInUser} path="/trip/:id" component={TripDetails} />
            </Switch>
            <br/>
            <br/>
            <br/>
            <br/>
            <Link className="footer"   to='/login'>
                                    <button className="loginsub2" onClick={() => this.logoutUser()}>Logout</button>
                                </Link>
            
                                
          </div>
        );
      }else {
    return (
      <div className="App">
      <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
      <Switch>
        <Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser}/>}/>
        <Route exact path='/' render={props => <Login {...props} getUser={this.getTheUser}/>}/>
     
        <ProtectedRoute user={this.state.loggedInUser} path="/trip/trips" component={TripList}/>
        <ProtectedRoute user={this.state.loggedInUser} path="/trip/:id" component={TripDetails} />
      </Switch>
      <Fooot userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
      </div>
    );
  }
  }
}

export default App;
 