import React from 'react';
import './Toolsinfo.css'; 
import calendarImage from '/Users/ryanarafeh/Desktop/Projects/ShiftHappens/client/src/assets/CalendarTools.png'; 

function ToolsInfo() {
    return (
        <section className="calendar-display">
            <div className="calendar-image">
                <img src={calendarImage} alt="Calendar Display" />
            </div>
            <div className="calendar-features">
                <h2>All the essential tools</h2>
                <p>Say goodbye to scheduling headaches. "Shift Happens" gives you the power to create conflict-free schedules in a snap, all within a sleek, user-friendly interface.</p>
                <ul>
                    <li><strong>Customizable Shift Swapping</strong>: Need to make changes? No problem. Our intuitive interface allows for easy drag-and-drop adjustments. Manage your team's shifts with flexibility and ease, ensuring everyone's happy.</li>
                    <li><strong>Intelligent Alerts</strong>: Stay ahead of scheduling conflicts with alerts that help you intervene before issues become problems.</li>
                    <li><strong>Smart Staffing Balance</strong>: Automatically balance staff levels to optimize coverage and efficiency.</li>
                </ul>
            </div>
        </section>
    );
}

export default ToolsInfo;
