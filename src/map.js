import React, {Component} from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';





class Maps extends Component{

    constructor(props){
        super(props);
        this.state = {
            locationCenter : {lat: 48.8534, lng: 2.3488},
            restaurant : [],
        }
    }

    componentDidMount() {
        this.setLocation();
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

    render() {
        const containerStyle = {
            width: '1250px',
            height: '685px'
        }
        const iconHome = './resource/img/icons8-home-address-64.png'

        console.log(iconHome)
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

                </GoogleMap>
            </LoadScript>
        )
    }


}

export default Maps