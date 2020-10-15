import React, {Component} from "react";
import { LoadScript } from '@react-google-maps/api';
import Maps from './map'
import Liste from './liste'


class App extends Component{
    constructor(props) {
        super(props);
        this.state ={
            userLocation : {lat: 48.8534, lng: 2.3488},
            lib : ['drawing'],
            data: [],
            newR: {}
        }

        this.addRestaurant = this.addRestaurant.bind(this)
    }

    componentDidMount() {
        this.setLocation();
        this.setData();


    }



   setData(){
        let url2 = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.995266,4.0221984&radius=5000&type=restaurant&key=AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY"
       let tab2 =[]
       //let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&radius=10000&type=restaurant&key=AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY";
       fetch(url2)
           .then(function (response){
               return response.json()
           }).then(function (data){
               let tab1 = data.results
               tab1.map(x =>
                   tab2.push({
                       place_id : x.place_id,
                       restaurantName: x.name,
                       address: x.vicinity,
                       lat: x.geometry.location.lat,
                       long: x.geometry.location.lng,
                       ratings:[],
                       average: x.rating,
                   })
               );
               tab2.forEach( e => {
                   let url3 = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id="+e.place_id+"&key=AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY";
                   fetch(url3)
                       .then(function (response){
                           return response.json()
                       }).then(function (data){
                           let tab3 = [];
                           if (data.result.reviews !== undefined){
                               data.result.reviews.map(x =>
                                   tab3.push({
                                       stars: x.rating,
                                       comment: x.text,
                                   })
                               );
                               e.ratings = tab3;
                           }
                       });
               })
               console.log(tab2)


       })
       this.setState({data : tab2})



    }


    setRatings(id){
        console.log(id)
        var request = new XMLHttpRequest();
        let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id="+id+"&key=AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY"
        let tabD = []
        request.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
               JSON.parse(this.responseText).result.reviews.map(x =>
                    tabD.push({
                        stars: x.rating,
                        comment: x.text,
                    })
                )
            }
        };
        request.open("GET", url );
        request.send();
        return tabD
    }

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
        let tabR = this.state.data
        tabR.push(newR)
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
