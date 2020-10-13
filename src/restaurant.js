import React, {Component} from "react";
import Info from "./info";


class Restaurant extends Component{

    constructor(props){
        super(props);
        this.state = {
            _name: this.props.name,
            _address: this.props.address,
            _ratings : this.props.ratings,
            _location : {
                lat:this.props.lat,
                lng:this.props.lng,
            },
        }
    }




    render() {
       return(
           <div id="case" >
               <h3>{this.state._name}</h3>
               <p>
                   {this.state._address}
                   <img  alt="etoiles" src={require("./resource/img/5star.png")}/><br />
                   <button className={this.state._name} data-toggle="modal" data-target="#exampleModalCenter">En voir plus</button>
               </p>
               <Info  ratings={this.state._ratings} location={this.state._location} />
           </div>
       )
    }


}

export default Restaurant