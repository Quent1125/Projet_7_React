import React, {Component} from "react";
import Restaurant from "./restaurant";
import Trie from "./tri";

class Liste extends Component{
    constructor(props) {
        super(props);
        this.state = {
            restaurantTri : [],

        }
        this.triRestaurant = this.triRestaurant.bind(this)
    }


    static getDerivedStateFromProps(props, state) {
        if (props.restaurant !== state.restaurantTri) {
            return {
                restaurantTri: props.restaurant
            };
        }
        return null;
    }




    triRestaurant(max,min){
        let tabR = this.props.restaurant.filter(x => (max>= x.average) && (x.average >=min))
        this.setState({restaurantTri:tabR}, () => this.props.tridata(this.state.restaurantTri))

    }



    render() {
        const {restaurantTri} = this.state
        return (
            <>
                <h2>Les restaurant</h2><br />
                <Trie tri={this.triRestaurant} />
                <div id="tableList">

                    {restaurantTri.map( (x,index) =>
                        <Restaurant key={index} name = {x.restaurantName} address= {x.address}  ratings={x.ratings} lat={x.lat} lng={x.long}  average={x.average}/>
                    )}
                </div>


            </>

        )

    }


}

export default Liste
