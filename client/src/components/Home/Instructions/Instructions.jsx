import React from 'react';
import './Instructions.css';
import teamTableImage from '../../../assets/team-table-image.png';


function Instructions() {
    return (
        <section className="instructions-team">
            <div className="team-table-image">
                <img src={teamTableImage} alt="Team Members Table" />
            </div>
            <div className="instructions">
                <h2>Your Scheduling, Streamlined</h2>
                <p>In just three simple steps, take back control of your time and focus on what truly matters — your team.</p>
                <ol>
                    <li>
                        <h3>Set Your Team</h3>
                        <p>Create profiles for your employees and define their weekly availability. Building your team is the first step towards streamlined scheduling.</p>
                    </li>
                    <li>
                        <h3>Generate the Schedule</h3>
                        <p>With a single click, 'Shift Happens' auto-populates your schedule, smartly aligning employee availability with your staffing needs.</p>
                    </li>
                    <li>
                        <h3>Fine-tune & Share</h3>
                        <p>Drag-and-drop to adjust shifts as needed. Then, effortlessly export the schedule or share it directly with your team.</p>
                    </li>
                </ol>
            </div>
        </section>
    );
}

export default Instructions;
