import React, {Component} from "react";


class Restaurant extends Component{

    constructor(props){
        super(props);
        this.state = {
            _location : this.props.location,
            _name: this.props.name,
            _address: this.props.address,
            _ratings: this.props.ratings,
            moy: 0,
        }
    }


    render() {
       return(
           <div className="case">
               <h3>{this.state._name}</h3>
               <p>
                   {this.state._address}
                   <img  alt="etoiles" src={require("./resource/img/5star.png")}/>
                   <button className={this.state._name}>En voir plus</button>
               </p>
           </div>
       )
    }


}

export default Restaurant