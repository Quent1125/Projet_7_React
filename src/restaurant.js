import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/cjs/Button";
import {GoogleMap, LoadScript, StreetViewPanorama} from "@react-google-maps/api";
import {Accordion, AccordionCollapse, AccordionToggle, FormGroup, FormLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";


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
            newratings : {
                star:0,
                comment:""
            }
        }
    }

    handleClose = () => this.setState({showInfo:false});


    handleShow = () => this.setState({showInfo:true});

    /*addNewRatings(){

    }*/
    /*handleChange(event) {
        const s = event.target.type === 'select-one' ? event.target.value;
        const co = event.target.value;

        this.setState({
            newratings : {
                star: {s},
                comment : {co}
            }
        })
        console.log(this.state.newratings)

    }*/

    render() {
        const mapContainerStyle = {
            height: "400px",
            width: "750px"
        };
       return(
           <div id="case" >
               <h3>{this.state.name}</h3>
               <p>
                   {this.state.address}
                   <img  alt="etoiles" src={require("./resource/img/5star.png")}/><br />
                   <Button variant="outline-primary" className={this.state.name} onClick={this.handleShow}>En voir plus</Button>
               </p>
               <Modal show={this.state.showInfo} onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                   <Modal.Header closeButton>
                       <Modal.Title>{this.state.name}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body >
                       <h1>Avis :</h1>
                       <div id="boxRatings">
                           {this.state.ratings.map((x,index) =>
                               <ul key={index}>
                                   <li><img key={index} id="littleStar" alt="étoiles" src={require(`./resource/img/${x.stars}star.png`)}   /> <br />
                                       {x.comment}</li>
                               </ul>
                           )}
                       </div><br/>

                       <Accordion>
                           <AccordionToggle as={Button} variant="primary" eventKey="0">Ajouter un avis</AccordionToggle>
                           <AccordionCollapse eventKey="0">
                               <Form>
                                   <FormGroup>
                                       <FormLabel>Note : </FormLabel>
                                       <Form.Control as="select"  custom className="min"  onChange={this.handleChange}>
                                           <option value={0}>0</option>
                                           <option value={1}>1</option>
                                           <option value={2}>2</option>
                                           <option value={3}>3</option>
                                           <option value={4}>4</option>
                                           <option value={5}>5</option>
                                       </Form.Control>
                                       <FormLabel>Commentaire:</FormLabel>
                                       <Form.Control as="textarea" rows="2"  onChange={this.handleChange}/>
                                   </FormGroup>
                                   <Button variant="success">Ajouter</Button>
                               </Form>
                           </AccordionCollapse>
                       </Accordion> <br/>

                       <LoadScript googleMapsApiKey="AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY">

                           <GoogleMap
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