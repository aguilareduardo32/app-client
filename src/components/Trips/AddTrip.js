import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class AddTrip extends Component {
    constructor(props){
        super(props);
        this.state = {dayOfTheTrip: "", leaveBetween: "", availableSeats:"", startingPointAdressNumber: "", startingPointZone: ""};
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const dayOfTheTrip = this.state.dayOfTheTrip;
        const leaveBetween = this.state.leaveBetween;
        const startingPointAdressNumber= this.state.startingPointAdressNumber;
        const startingPointZone= this.state.startingPointZone;
        const availableSeats = this.state.availableSeats
       
        axios.post(`${process.env.REACT_APP_API_URL}/create`, { dayOfTheTrip, leaveBetween, startingPointZone, startingPointAdressNumber, availableSeats}, {withCredentials:true})
        .then( () => {
            alert("trip created")
                    this.props.history.push('/trips');
                })
                .catch( error => console.log(error) )
    }
            
    handleChange = (event) => {  
                const {name, value} = event.target;
                this.setState({[name]: value});
                
    }
    
    render(){
        return(
            
            <div>
                <form class="login-form"  onSubmit={this.handleFormSubmit}>
                <br/>
                 <h3>register a trip</h3>
                 <br/>
                    <label>dayOfTheTrip: </label>
                    <input class="w3-input" type="date" name="dayOfTheTrip" value={this.state.dayOfTheTrip} onChange={ e => this.handleChange(e)}/>
                    <br/>
                    <br/>
                    <label>leaveBetween: </label> 
                    <input class="w3-input" type="time" name="leaveBetween" value={this.state.leaveBetween} onChange={ e => this.handleChange(e)}/>
                    <br/>
                    <br/>
                    <label>Starting point zone: </label>
                    <select  name="startingPointZone" value={this.state.startingPointZone} onChange={e => this.handleChange(e)} style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2" >
                        <option value='' disabled>starting Point Zone</option>
                        <option name="Alamos" startingpointzone="Alamos">Alamos</option>
                        <option name="Moderna" startingpointzone="Moderna">Moderna</option>
                        <option name="Narvarte" startingpointzone="Narvarte">Narvarte</option>
                        <option name="DelValle" startingpointzone="DelValle">Del Valle</option>
                    </select>
                    <br/>
                    <br/>
                    <label>Starting point adress & number: </label>
                    <input class="w3-input" type="string" name="startingPointAdressNumber" value={this.state.startingPointAdressNumber} onChange={ e => this.handleChange(e)}/>
                    <br/>
                    <br/>
                    <label>Available Seats: </label>
                    <select  name="availableSeats" value={this.state.availableSeats} onChange={e => this.handleChange(e)} >
                        <option value='' disabled>Available seats</option>
                        <option name="1" availableseats="1">1</option>
                        <option name="2" availableseats="3">2</option>
                        <option name="3" availableseats="3">3</option>
                    </select>
                    <br/>
                    <br/>
                    <input className="loginsub" type="submit" value="Submit" />
                </form>
                <br/>
                
                <Link style={{ textDecoration: 'none',
                color: 'black' }} className="loginsub2"  to={'/trips'}>Back to trips</Link>
                </div>
        )
    }
        

}
export default AddTrip;