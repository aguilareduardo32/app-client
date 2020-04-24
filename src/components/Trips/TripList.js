import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Background1 from '../images/carpool1.jpg'
import '../../css/tripList.css'
import AuthService from '../auth/auth-service';


var sectionStyle = {
    width: '100%',
    height: '800px',
    backgroundImage: `url(${Background1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover' ,
    
    
  
  };


class TripList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
             listOfTrips: [],
             showAddForm: false,
           
            };
        this.service = new AuthService();
    
    };
       
    
    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.setState({ loggedInUser: null });
            
        })
    }
    
    getAllTrips = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/trips`,{withCredentials:true})
        .then(responseFromApi => {
             this.setState({
              listOfTrips: responseFromApi.data
            })  
        })
    }
    
    componentDidMount() {
        this.getAllTrips();
    }

   

    pilotCheck = () => {

         if(this.props.loggedInUser.rol  === "PILOT"){
            return(
                 <div>
                 <br/>
                    <Link className="loginsub2" to={`/create`} >Create trip 🚗</Link>  
                    <br/>
                    <br/>
                        <h3>Trip List</h3>
                        <br/>
                        { this.state.listOfTrips.map( trip => {
                            return ( 
                              
                                    <div class="card1" key={trip._id}>
                                    <div class="container">
                                    <br/>
                                        <p>date: {trip.dayOfTheTrip}</p>
                                        <p>leave at: {trip.leaveBetween}</p>
                                        <p>starting point zone:  {trip.startingPointZone}</p>
                                        <p>starting point adress number:  {trip.startingPointAdressNumber}</p>
                                        <p>pilot name: {trip.pilot.username}</p>
                                        <p>register copilots { trip.copilots.length }/ {trip.availableSeats}</p>
                                        <br/>
                                        <Link className="loginsub2" to={`/${trip._id}`}>Check trip details</Link>
                                    </div>
                                    </div>
                                )
                            })
                        }
                 </div> 
            
    
            )
        }
    }

    copilotCheck = () => {

        if(this.props.loggedInUser.rol  === "COPILOT"){
            return(
              
                 <div >
                 <br/>
                 
                    <h3>Trip List</h3>
                    <br/>
                    { this.state.listOfTrips.map( trip => {
                        return ( 
                                <div key={trip._id}>
                                <br/>
                                    <p>pilotname: {trip.pilot.username}</p>
                                    <p>leave At: {trip.leaveBetween}</p>
                                    <p> date: {trip.dayOfTheTrip}</p>
                                    <p>starting point zone:  {trip.startingPointZone}</p>
                                    <p>starting point adress number:  {trip.startingPointAdressNumber}</p>
                                     <p>register copilots { trip.copilots.length }/ {trip.availableSeats}</p>
                                     
                                    <Link style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2" to={`/${trip._id}`}>trip details</Link>
                                    <br/>
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
          <section style={ sectionStyle }>
                <div>
                    {this.copilotCheck(this.state)}
                </div>
                <div>
                     {this.pilotCheck(this.state)}
                </div>
                
                </section>
        )
    }
}

export default TripList;      