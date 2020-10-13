import React, {Component} from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';





class Maps extends Component{

    constructor(props){
        super(props);
        this.state = {
            tabRestaurant : this.props.data,
            locationCenter : {lat: 48.8534, lng: 2.3488},  //par default localisation de Paris
            restaurantLocation : [],
        }
    }

    componentDidMount() {
        this.setLocation();
        this.setRestaurantLocation();
    }

    setLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState( {locationCenter: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        })
    }}

    setRestaurantLocation(){
        let tabR = [];
        this.state.tabRestaurant.map(x=> tabR.push({lat:x.lat,lng:x.long}));
        this.setState({restaurantLocation : tabR});
    }

    render() {
        const containerStyle = {
            width: '1250px',
            height: '685px'
        }
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={this.state.locationCenter}
                    zoom={14}
                >
                    <Marker
                        position={this.state.locationCenter}
                        icon={require("./resource/img/icons8-home-address-64.png")}
                    />
                    {this.state.restaurantLocation.map((x,index) =>
                        <Marker
                            key={index}
                            position={x}
                            icon={require("./resource/img/icons8-tableware-64.png")}
                        />
                    )}

                </GoogleMap>
            </LoadScript>
        )
    }


}

export default Maps