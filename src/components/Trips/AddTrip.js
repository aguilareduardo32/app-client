import React, { Component } from 'react';
import axios from 'axios';

class AddTrip extends Component {
    constructor(props){
        super(props);
        this.state = {dayOfTheTrip: "", leaveBetween: "", seats:"", from: ""};
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const dayOfTheTrip = this.state.dayOfTheTrip;
        const leaveBetween = this.state.leaveBetween;
        const from = this.state.from;
        const availableSeats = this.state.availableSeats
       
        axios.post("http://localhost:5000/trip/create", { dayOfTheTrip, leaveBetween, from, availableSeats}, {withCredentials:true})
        .then( () => {
                 
                    this.props.history.push('/trip/trips');
                })
                .catch( error => console.log(error) )
    }
            
    handleChange = (event) => {  
                const {name, value} = event.target;
                this.setState({[name]: value});
    }
    
    render(){
        return(
            <div style={{width: '60%', display:'block'}}>
                <h3>register a trip</h3>
                <form   onSubmit={this.handleFormSubmit}>
                    <label>dayOfTheTrip</label>
                    <input type="date" name="dayOfTheTrip" value={this.state.dayOfTheTrip} onChange={ e => this.handleChange(e)}/>
                    <label>leaveBetween</label> 
                    <input type="number" name="leaveBetween" value={this.state.leaveBetween} onChange={ e => this.handleChange(e)}/>
                    <br/><label>from</label>
                    <input type="string" name="from" value={this.state.from} onChange={ e => this.handleChange(e)}/>
                    <label>availableSeats</label>
                    <input type="number" name="availableSeats" value={this.state.availableSeats} onChange={ e => this.handleChange(e)}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
        

}
export default AddTrip;