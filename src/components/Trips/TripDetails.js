import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/signup.css'
import Img from 'react-image'



class TripDetails extends Component {
   constructor(props){
       super(props);
        this.state = {};
     
    }

    componentDidMount(){
      this.getSingleTrip()
  }

    

    getSingleTrip = () => {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API_URL}/trip/${params.id}`, {withCredentials:true})
        .then( responseFromApi =>{
           const theTrip = responseFromApi.data;
           this.setState(theTrip)
           
        }) 
        .catch((err) => {
            console.log(err)
        })
    }

    AddCuCopilot = () => {
      const { params } = this.props.match;
      axios.put(`http://localhost:5000/trip/${params.id}`, {}, {withCredentials: true})
      .then( () =>{
       console.log("copilot agregado")
       alert("you are in the trip")
       this.props.history.push('/trip/trips');
        // after submitting the form, redirect to '/trips'
          
    })
      .catch( error => console.log(error) )
    }

    deleteTrip = () => {
        const { params } = this.props.match;
        axios.delete(`http://localhost:5000/trip/${params.id}`,{withCredentials:true})
        .then( () =>{
            this.props.history.push('/trip/trips'); // !!!         
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    
    ownershipCheck = (trip) => {
        
        if( this.props.loggedInUser && trip.pilot && trip.pilot._id === this.props.loggedInUser._id ){
          return (
              <div>
              <br/>
                    <button style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2" onClick={() => this.deleteTrip() }>Cancel trip</button>
              </div>
          )
        } 

        
        
          
      }

    checkCopilot = (trip) => {
      
        if(this.props.loggedInUser.rol  === "COPILOT" && trip.availableSeats >= trip.copilots + 1 ){
          return(
            
            <div>
              <br/>
                <button style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2" onClick={() => this.AddCuCopilot() }>join tha trip</button>
            </div>
          )
        } else if( this.props.loggedInUser.rol  === "COPILOT" && trip.availableSeats === trip.copilots + 1 ){
         return(
           <div>
               <h2>Full Trip</h2>
              <p> 0 available availableSeats</p>
               </div>  
           )
         
        } else return null
        
      } 
    
    render(){
      
          return ( 
              <div>
                      <br/>
                      <br/>
                     <h3>Trip details</h3>
                      <p>leaveBetween: {this.state.leaveBetween}</p>
                      <p>date:{this.state.dayOfTheTrip}</p>
                      <p>starting point zone:  {this.state.startingPointZone}</p>
                      <p>starting point adress number:  {this.state.startingPointAdressNumber}</p>
                      <br/>
                      <p>pilot name: {this.state.pilot &&  this.state.pilot.username}</p>
                      <p>{this.state.pilot &&  this.state.pilot.profilePic}</p>
                      <br/>
                      { this.state.copilots && this.state.copilots.length > 0 ? <h3>Copilots Names </h3> : <h2>no copilots yet</h2> }
                      { this.state.copilots && this.state.copilots.map((copilot, index) => {
                          return( 
                            <div>
                              <p key={ index }>
                                  {copilot.username}
                                 
                              </p>
                              <div>
                              <Img src={copilot.profilePic}  crossorigin="anonymous"/> 
                              </div>
                              </div>
                          )
                        })
                      }
                      {this.ownershipCheck(this.state)}
                      {this.checkCopilot(this.state)}
                      
                  

                  <br></br>  <Link style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2"  to={'/trip/trips'}>Back to trips</Link>

                  
              </div>
          )
    }
}

export default TripDetails;

