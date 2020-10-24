import React, {Component} from "react";
import {GoogleMap, Marker, DrawingManager} from '@react-google-maps/api';
import Modal from "react-bootstrap/Modal";
import {FormGroup, FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";





class Maps extends Component{

    constructor(props){
        super(props)
        this.state = {
            locationCenter : {},
            restaurantLocation : [],
            showAdd : false,
            drawing : 'marker',
            newR : {
                restaurantName:"",
                address:"",
                lat:0,
                long:0,
                ratings:[]
            }

        }
        this.handleSend = this.handleSend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)




    }

    static getDerivedStateFromProps(props, state) {
        if ((props.location !== state.locationCenter) || (props.restaurantLocation !== state.restaurantLocation)) {
            return {
                locationCenter: props.location,
                restaurantLocation: props.restaurantLocation
            };
        }
        // Renvoie `null` si aucune mise à jour de l’état n’est nécessaire.
        return null;
    }

    handleClose = () => this.setState({showAdd:false})


    handleShow = marker => {
        let lat = marker.getPosition().lat()
        let lng = marker.getPosition().lng()
        this.setState({
            drawing : null,
            showAdd:true,
            newR : {
                restaurantName:this.state.newR.restaurantName,
                address:this.state.newR.address,
                lat:lat,
                long:lng,
                ratings:this.state.newR.ratings
            }
        })
    }

    handleChange(event) {
        if (event.target.name === 'name'){
            let s =  event.target.value
            this.setState({
                newR : {
                    restaurantName:s,
                    address:this.state.newR.address,
                    lat:this.state.newR.lat,
                    long:this.state.newR.long,
                    ratings:this.state.newR.ratings
                }
            })
        }else if (event.target.name === 'address'){
            let co = event.target.value
            this.setState({
                newR : {
                    restaurantName:this.state.newR.restaurantName,
                    address:co,
                    lat:this.state.newR.lat,
                    long:this.state.newR.long,
                    ratings:this.state.newR.ratings
                }
            })
        }
    }

    handleSend(){
        this.setState({
            drawing : 'marker',
            showAdd:false,

        })
        this.props.addRestaurant(this.state.newR)
    }






    render() {
        const containerStyle = {
            width: '1250px',
            height: '685px'
        }
        const {locationCenter, restaurantLocation, drawing, showAdd} = this.state

        return (
            <div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={locationCenter}
                    zoom={13}
                >

                    {restaurantLocation.map((x,index) =>
                        <Marker
                            key={index}
                            position={x}
                            zIndex={index}
                            icon={require("./resource/img/icons8-tableware-64.png")}
                        />
                        )
                    }
                    <Marker
                        position={locationCenter}
                        icon={require("./resource/img/icons8-home-address-64.png")}
                        zIndex={this.state.restaurantLocation.length} //permet de placer le marker au dessus des autres
                    />
                    <DrawingManager

                        onMarkerComplete= {this.handleShow}
                        options = {
                            {
                                drawingMode:{drawing},
                                drawingControl: false,
                                markerOptions: {
                                    icon: require("./resource/img/icons8-tableware-64.png")
                                },
                            }
                        }
                    />

                </GoogleMap>


                <Modal show={showAdd}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un restaurant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form>
                            <FormGroup>
                                <FormLabel>Nom du restaurant : </FormLabel>
                                <Form.Control as="input" type='text' name='name' paceholder="Nom du restaurant" onChange={this.handleChange} />
                                <FormLabel>Adresse du restaurant  : </FormLabel>
                                <Form.Control as="input" type='text' name='address' paceholder="Adresse du restaurant" onChange={this.handleChange} />
                            </FormGroup>
                            <Button variant="success" onClick={this.handleSend}>Ajouter</Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>


        )
    }


}

export default Maps