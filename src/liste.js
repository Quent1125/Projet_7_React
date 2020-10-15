import React, {Component} from "react";
import Restaurant from "./restaurant";
import Trie from "./tri";

class Liste extends Component{
    constructor(props) {
        super(props);
        this.state = {
            restaurant : this.props.restaurant,
            restaurantTri : this.props.restaurant,

        }
        this.triRestaurant = this.triRestaurant.bind(this)
    }

    averageStars(ratings){
        let average = 0;
        ratings.map( x => average += x.stars);
        average =  average/(ratings.length);
        return(average)
    }


    triRestaurant(max,min){
        let tabR = this.state.restaurant.filter(x => (max>= this.averageStars(x.ratings)) && ((this.averageStars(x.ratings)) >=min))
        this.setState({restaurantTri:tabR})
    }



    render() {
        return (
            <>
                <h2>Les restaurant</h2><br />
                <Trie tri={this.triRestaurant} />
                <div id="tableList">
                    {this.state.restaurantTri.map( (x,index) =>
                        <Restaurant key={index} name = {x.restaurantName} address= {x.address}  ratings={x.ratings} lat={x.lat} lng={x.long} />
                    )}
                </div>


            </>

        )

    }


}

export default Liste