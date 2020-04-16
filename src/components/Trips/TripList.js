import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTrip from './AddTrip';


class TripList extends Component {
    
    constructor() {
        super();
        this.state = {
             listOfTrips: [],
             showAddForm: false
             };
        this._onButtonClick = this._onButtonClick.bind(this)
    }
    
    getAllTrips = () => {
        axios.get(`http://localhost:5000/trip/trips`,{withCredentials:true})
        .then(responseFromApi => {
             this.setState({
              listOfTrips: responseFromApi.data
            })  
        })
    }
    
    componentDidMount() {
        this.getAllTrips();
    }

    _onButtonClick() {
        this.setState({
            showAddForm: true
        });
    }

    pilotCheck = () => {

         if(this.props.loggedInUser.rol  === "PILOT"){
            return(
                <div>
                    <Link to={`/trip/create`}>Create trip</Link>  
                  
                    <div style={{width: '60%', float:"left"}}>
                        <h3>Trip List</h3>
                        { this.state.listOfTrips.map( trip => {
                            return ( 
                                    <div key={trip._id}>
                                        <p>date: {trip.dayOfTheTrip}</p>
                                        <p>leaveBetween: {trip.leaveBetween}</p>
                                        <p>from:  {trip.from}</p>
                                        <p>pilot name: {trip.pilot.username}</p>
                                        <p>register copilots { trip.copilots.length }/ {trip.availableSeats}</p>
                                        <Link to={`/trip/${trip._id}`}>Check trip details</Link>
                                    </div>
                                )
                            })
                        }
                    </div> 
                </div>
    
            )
        }
    }

    copilotCheck = () => {

        if(this.props.loggedInUser.rol  === "COPILOT"){
            return(
              
                 <div style={{width: '60%'}}>
                    <h3>Trip List</h3>
                    { this.state.listOfTrips.map( trip => {
                        return ( 
                                <div key={trip._id}>
                                    <p>pilotname: {trip.pilot.username}</p>
                                    <p>leaveBetween: {trip.leaveBetween}</p>
                                    <p> date: {trip.dayOfTheTrip}</p>
                                    <p>from: {trip.from}</p>
                                     <p>register copilots { trip.copilots.length }/ {trip.availableSeats}</p>
                                    <Link to={`/trip/${trip._id}`}>Check trip details</Link>
                                </div>
                             )
                        })
                    }
                  </div> 
               )
        }
    }
    




    
    render() {
        return(
          <div>
                <div>
                    {this.copilotCheck(this.state)}
                </div>
                <div>
                     {this.pilotCheck(this.state)}
                </div>
          </div>  
        )
    }
}

export default TripList;      