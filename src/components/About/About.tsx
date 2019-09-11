import React from "react";
import './scss/About.scss';

class About extends React.Component<{}, {}>  {


    render() {
        return (
            <div className="about-container">
                <div className="about-text-container">
                    <h2>About us</h2>
                    <p className="about-text">
                        We continue to be one of the top sake bars in Sweden, attracting countless sake lovers from around the world. Our one-of-a-kind menu consists of over 260 kinds of carefully selected sakes, authentic tapas-style Japanese dishes, and homemade desserts. We are known for being a "hidden jewel" of Stockholm also because of our unique and hidden location. Come find us at Torstenssonsgatan 15, 114 56 Stockholm and transport yourself to Tokyo.
                    </p>
                    <h2>Opening hours</h2>
                    <h3>Lunch</h3>
                    <p>11:30AM to 2:20PM Monday-Friday</p>
                    <h3>Dinner</h3>
                    <p>opens at 6:00PM to 11.00 everyday</p>

                </div>
            </div>
        )
    }
}

export default About;