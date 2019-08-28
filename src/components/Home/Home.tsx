import React from "react";
import './scss/Home.scss';

class Home extends React.Component<{}, {}>  {

    render() {
        return(
            <div className="hero-container">
                <div className="title-container">
                    <div className="row">
                        <h1>No Name Restaurant</h1>
                        <h2>Tuesday - Sunday &emsp;&emsp; 12 am - Midnight </h2>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;