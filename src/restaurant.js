import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/cjs/Button";
import {GoogleMap, LoadScript, StreetViewPanorama} from "@react-google-maps/api";


class Restaurant extends Component{

    constructor(props){
        super(props);
        this.state = {
            showInfo :false,
            name: this.props.name,
            address: this.props.address,
            ratings : this.props.ratings,
            location : {
                lat:this.props.lat,
                lng:this.props.lng,
            },
        }
    }

    handleClose = () => this.setState({showInfo:false});


    handleShow = () => this.setState({showInfo:true});



    render() {
        const mapContainerStyle = {
            height: "400px",
            width: "800px"
        };
       return(
           <div id="case" >
               <h3>{this.state.name}</h3>
               <p>
                   {this.state.address}
                   <img  alt="etoiles" src={require("./resource/img/5star.png")}/><br />
                   <button className={this.state.name} onClick={this.handleShow}>En voir plus</button>
               </p>
               <Modal show={this.state.showInfo} onHide={this.handleClose}>
                   <Modal.Header closeButton>
                       <Modal.Title>{this.state.name}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       {this.state.ratings.map((x,index) =>
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
                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={this.handleClose}>
                           Fermer
                       </Button>
                   </Modal.Footer>
               </Modal>
           </div>
       )
    }


}

export default Restaurant