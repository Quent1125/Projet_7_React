import React, {Component} from "react";
import { LoadScript } from '@react-google-maps/api';
import Maps from './map'
import Liste from './liste'
import data from "./resource/restaurant.json"


class App extends Component{
    constructor(props) {
        super(props);
        this.state ={
            userLocation : {lat: 48.8534, lng: 2.3488},
            lib : ['drawing'],
            data: data,
            newR: {}
        }

        this.addRestaurant = this.addRestaurant.bind(this)
    }

    componentDidMount() {
        this.setLocation();
        //this.setData();
    }

   /* setData(){
        var request = new XMLHttpRequest();
        let tabD = [];
        request.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                tabD = JSON.parse(this.responseText);
            }
        };
        this.setState({data : {tabD}})
        console.log(this.state.data)
        request.open("GET", "https://www.prevision-meteo.ch/services/json/paris");
        request.send();
    }*/

    setLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState( {userLocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
            })
        }
    }

    addRestaurant(newR){
        let tabR = this.state.data;
        tabR.push(newR);
        console.log(tabR)
        this.setState({data : tabR})
    }

    render() {
        return(
            <>
                <LoadScript
                    googleMapsApiKey="AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY"
                    libraries={this.state.lib}
                >
                    <div id="list">
                        <Liste restaurant={this.state.data} />
                    </div>

                    <div id="map"><Maps data={this.state.data} location={this.state.userLocation} addRestaurant={this.addRestaurant} /></div>


                </LoadScript>
            </>
        )
    }
}


export default App
