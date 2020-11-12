import React, {Component} from "react";
import Restaurant from "./restaurant";
import Trie from "./tri";

class Liste extends Component{
    constructor(props) {
        super(props);
        this.state = {
            valueMax : 5,
            valueMin : 0,
        }
        this.triRestaurant = this.triRestaurant.bind(this)
    }


/*
    componentDidUpdate(prevProps) {
        if (prevProps.restaurant !== this.props.restaurant){
            this.setState({restaurantTri :
                    this.props.restaurant.filter(x=> (5>= x.average) && (x.average>=0))
            })
        }
    }*/








    triRestaurant(max,min){
        this.setState({
            valueMax: max,
            valueMin: min
        })
        let tabR = this.props.restaurant.filter(x => (max>= x.average) && (x.average >=min))
        this.props.tridata(tabR)

    }



    render() {

        return (
            <>
                <h2>Les restaurants</h2><br />
                <Trie tri={this.triRestaurant} />
                <div id="tableList">

                    {this.props.restaurant.filter(x => (this.state.valueMax>= x.average) && (x.average >=this.state.valueMin)).map( (x,index) =>
                        <Restaurant key={index} name = {x.restaurantName} address= {x.address}  ratings={x.ratings} lat={x.lat} lng={x.long}  average={x.average}/>
                    )}
                </div>


            </>

        )

    }


}

export default Liste
