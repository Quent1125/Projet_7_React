import React, {Component} from "react";
import Trie from "./Trie";


class Liste extends Component{

    constructor(props){
        super(props);
        this.state = {
            restaurantList : this.props.data,
        }
    }




    render() {
        return(
            <>
                <h2>Liste des restaurant</h2><br />
                <Trie restaurant={this.state.restaurantList}/>
            </>
        )
    }


}

export default Liste