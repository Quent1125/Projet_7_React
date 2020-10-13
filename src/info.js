import React, {Component} from "react";
import {StreetViewPanorama} from "@react-google-maps/api";
import {GoogleMap, LoadScript} from "@react-google-maps/api";

class Info extends Component{

    constructor(props){
        super(props);
        this.state = {
            ratings : this.props.ratings,
            location : this.props.location,
        }
    }



    render() {
        const mapContainerStyle = {
            height: "400px",
            width: "800px"
        };

        return(
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        {this.state.ratings.map( (x,index) =>
                            <ul key={index}>
                                <li>Note : {x.stars} sur 5 </li>
                                <li>Commentaire : {x.comment}</li>
                            </ul>
                        )}
                        <LoadScript googleMapsApiKey="AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY">

                                <GoogleMap
                                    id="circle-example"
                                    mapContainerStyle={mapContainerStyle}
                                    zoom={7}
                                    center={this.state.location}
                                >
                                    <StreetViewPanorama
                                        position={this.state.location}
                                        visible={true}
                                    />
                                </GoogleMap>
                            </LoadScript>
                    </div>
                </div>
            </div>
        </div>
        )
    }


}

export default Info
