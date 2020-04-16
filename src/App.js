import React, { Component} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TripDetails from './components/Trips/TripDetails';
import TripList from './components/Trips/TripList';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';
import AddTrip from './components/Trips/AddTrip';
require('dotenv').config()

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
          this.setState({
            loggedInUser: false
          })
        })
    }
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
          <div className="App">
            <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
 
            <Switch>
              <ProtectedRoute user={this.state.loggedInUser} path="/trip/create" component={AddTrip}/>
              <ProtectedRoute user={this.state.loggedInUser} path="/trip/trips" component={TripList}/>
              <ProtectedRoute user={this.state.loggedInUser} path="/trip/:id" component={TripDetails} />
            </Switch>
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
      </div>
    );
  }
  }
}

export default App;
 