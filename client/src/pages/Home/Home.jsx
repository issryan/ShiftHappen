import React from 'react';
import './Home.css'
import Nav from '../../components/Nav/Nav'
import illustration from '../../assets/illustrationTeam.png'

export default function Home() {

    const Feature = ({ borderColor, title, description, iconUrl, additionalImageUrl }) => {
        return (
            <div className="feature" style={{ borderColor }}>
                <div className="featureIcon" style={{ borderColor }}>
                    <img src={iconUrl} alt="" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                {additionalImageUrl && <img src={additionalImageUrl} alt="" className="additionalImage" />}
            </div>
        );
    };

    return (
        <>
            <Nav />
            <div className="overviewContainer">
                <div className="textContainer">
                    <h1>Seamless Scheduling, Happier Teams</h1>
                    <p>Scheduling is no longer a puzzle with "Shift Happens." Our free app lets managers weave through employee scheduling with ease, saving hours by automating conflict detection and resolution. Whether it's avoiding under or overstaffing or just crafting the perfect monthly schedule, we make sure you’re covered. So why wait? Say goodbye to the scheduling scramble and hello to hassle-free harmony with "Shift Happens."</p>
                    <div className="actionButtonsContainer">
                        <button className="button getStarted">Get Started</button>
                        <button className="button learnMore">Learn more </button>
                    </div>
                </div>
                <div className="imageContainer">
                    <img src={illustration} alt="Placeholder" />
                </div>
            </div>
        </>
    )
}