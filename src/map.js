import React, {Component} from "react";
import { GoogleMap,  Marker, DrawingManager } from '@react-google-maps/api';





class Maps extends Component{

    constructor(props){
        super(props);
        this.state = {
            tabRestaurant : this.props.data,
            locationCenter : this.props.location,
            restaurantLocation : [],

        }
    }

    componentDidMount() {
        this.setRestaurantLocation();
    }



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


        const onMakerComplete = marker => {
            console.log(marker.getPosition().lat(),marker.getPosition().lng())
        }

        return (

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
                    {<DrawingManager

                        onMarkerComplete= {onMakerComplete}
                        options = {
                            {
                                drawingMode:"marker",
                                drawingControl: false,
                                markerOptions: {
                                    icon: require("./resource/img/icons8-tableware-64.png")
                                },
                            }
                        }
                    />}

                </GoogleMap>

        )
    }


}

export default Maps