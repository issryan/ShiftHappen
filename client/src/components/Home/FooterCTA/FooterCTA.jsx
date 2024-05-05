import React from 'react';
import './FooterCTA.css';

function FooterCTA() {
    return (
        <section className="footer-cta">
            <h2>Ready to get started?</h2>
            <p>Take the first step towards effortless scheduling.</p>
            <div className='btn-container'>
            <button className="cta-button">Launch Your Schedule</button>
            </div>
        </section>
    );
}

export default FooterCTA;
