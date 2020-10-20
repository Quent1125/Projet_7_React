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





    triRestaurant(max,min){
        console.log("tri")
        console.log(this.state.restaurantTri)
        let tabR = this.state.restaurant.filter(x => (max>= x.average) && (x.average >=min))
        this.setState({restaurantTri:tabR})

    }



    render() {
        console.log("render")
        console.log(this.state.restaurantTri)
        return (
            <>
                <h2>Les restaurant</h2><br />
                <Trie tri={this.triRestaurant} />
                <div id="tableList">

                    {this.state.restaurantTri.map( (x,index) =>
                        <Restaurant key={index} name = {x.restaurantName} address= {x.address}  ratings={x.ratings} lat={x.lat} lng={x.long}  average={x.average}/>
                    )}
                </div>


            </>

        )

    }


}

export default Liste
