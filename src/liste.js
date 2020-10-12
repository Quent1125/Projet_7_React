import React, {Component} from "react";
import Restaurant from "./restaurant.js";

class Liste extends Component{

    constructor(props){
        super(props);
        this.state = {
            restaurantList : [],
        }
    }

    openJSON(){
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if ((this.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                let response = JSON.parse(this.responseText);
                response.map( x => this.setState({restaurantList: this.restaurantList.push(x)}))
            }

        };
    }

    componentDidMount() {
        this.openJSON();
    }

    render() {

        return(
            <div className="tableList">
                <h2>Liste des restaurant</h2>
                {this.restaurantList.map( x =>
                    <Restaurant location = {x.location} name = {x.name} address= {x.address} ratings = {x.ratings} />
                )}
            </div>
        )
    }


}

export default Liste