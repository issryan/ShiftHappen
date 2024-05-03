import React from 'react';
import './Hero.css'
import illustration from '../../../assets/illustrationTeam.png'

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Seamless Scheduling, Happier Teams</h1>
                    <p>Scheduling is no longer a puzzle with "Shift Happens". Our free app lets managers weave through employee scheduling with ease, saving hours by automating conflict detection and resolution.</p>
                    <div className="hero-buttons">
                        <button className="btn-get-started">Get Started</button>
                        <button className="btn-learn-more">Learn more →</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={illustration} alt="Hero" />
                </div>
            </div>
        </section>
    );
}

export default Hero;