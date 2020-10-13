import React, {Component} from "react";
import Restaurant from "./restaurant.js";


class Liste extends Component{

    constructor(props){
        super(props);
        this.state = {
            restaurantList : this.props.data,
        }
    }




    render() {
        return(
            <div id="tableList">
                <h2>Liste des restaurant</h2>
                {this.state.restaurantList.map( (x,index) =>
                    <Restaurant key={index} name = {x.restaurantName} address= {x.address}  ratings={x.ratings} lat={x.lat} lng={x.long} />
                )}
            </div>
        )
    }


}

export default Liste