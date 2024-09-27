import React from "react"; 
import { Link } from "react-router-dom";
import "./App.css"; 


function WelcomePage() {
    return (
        <div className="hero">
            <div className="hero-content">
            <h1 className="title">Welcome to Doggy Daycare!</h1>
            <p className="subtitle">Your Dog's second Home!</p>
            <Link to="/catalog" className="button">See All Dogs</Link>
             </div>

        </div>
    );
}
export default WelcomePage;
