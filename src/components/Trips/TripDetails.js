import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Map from '../maps/Map'
import MapWithADirectionsRenderer from '../maps/MapDirection';




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
        axios.get(`http://localhost:5000/trip/${params.id}`, {withCredentials:true})
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

    
    ownershipCheck = () => {
        
        if(  this.props.loggedInUser && this.props.loggedInUser._id === this.state.pilot ){
          return (
              <div>
                    <button onClick={() => this.deleteTrip()}>Cancel trip</button>
              </div>
          )
        }
        
          
      }

    checkCopilot = (trip) => {
      
        if(this.props.loggedInUser.rol  === "COPILOT"){
          return(
            <div>
                <button onClick={() => this.AddCuCopilot()}>join tha trip</button>
            </div>
          )
        }
      } 
    
    render(){
      
          return ( 
              <div>
                     <h3>Trip details</h3>
                      <p>leaveBetween: {this.state.leaveBetween}</p>
                      <p>date:{this.state.dayOfTheTrip}</p>
                      <p>from:{this.state.from}</p>
                      <p>{this.state.pilot &&  this.state.pilot.username}</p>
                      { this.state.copilots && this.state.copilots.length > 0 ? <h3>Copilots Names </h3> : <h2>no copilots yet</h2> }
                      { this.state.copilots && this.state.copilots.map((copilot, index) => {
                          return( 
                              <p key={ index }>
                                  {copilot.username}
                              </p>
                          )
                        })
                      }
                      {this.props.loggedInUser._id === this.state.pilot ? <button onClick={() => this.deleteTrip()}>Cancel trip</button> : null }
                      {this.checkCopilot(this.state)}
                      {this.ownershipCheck(this.state)}
                  

                  <br></br>  <Link to={'/trip/trips'}>Back to trips</Link>

                  
              </div>
          )
    }
}

export default TripDetails;

