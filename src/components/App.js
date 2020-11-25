import React from "react";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import PropTypes from 'prop-types';

class App extends React.Component{

    state = {
        fishes: {},
        orders: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount(){
        const params = this.props.match.params;
        const localStorageRef = localStorage.getItem(params.storeID);
        if (localStorageRef) {
            this.setState({orders: JSON.parse(localStorageRef)});
        }
    }

    componentDidUpdate(){
        localStorage.setItem(
            this.props.match.params.storeID,
            JSON.stringify(this.state.orders)
        );
    }

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes: sampleFishes
        });
    };

    deleteFish = (key) => {
        let fishes = {...this.state.fishes};
        delete fishes[key];
        this.setState({
            fishes: fishes
        })       
    };

    updateFish = (key, updatedFish) =>{
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({
            fishes: fishes
        })
    }

    loadSamplesFishes = () => {
        this.setState({ fishes: sampleFishes});
    };

    addToOrder = (key) =>{
        const order = {...this.state.orders};
        order[key] = order[key] + 1 || 1;
        this.setState({
            orders: order
        });
    }

    removeFromOrder = (key) =>{
        const order = {...this.state.orders};
        delete order[key];
        this.setState({
            orders: order
        });
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                        <Fish 
                        key={key} 
                        index={key}
                        details={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}>
                        </Fish>)
                        )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.orders} removeFromOrder={this.removeFromOrder} />
                <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSamplesFishes={this.loadSamplesFishes} fishes={this.state.fishes} />
            </div>
        )
    }
}

export default App;