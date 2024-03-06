//file that calculates the dates of employees availability per month.
import axios from 'axios';

//function to calculate the dates of availability and repeat for 4 weeks.
const transformEmployeeAvailabilityToScheduleData = (employees) => {
    const events = [];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Assuming the availability object is like { Monday: true, Tuesday: false, ... }
    employees.forEach(employee => {
        daysOfWeek.forEach((day, index) => {
            if (employee.availability[day]) {
                // For simplicity, let's just create an event on the next occurrence of each day
                let date = new Date(); // Start from today
                date.setDate(date.getDate() + ((index + 7 - date.getDay()) % 7)); // Get next occurrence of the day
                if (date.getDay() !== index) date.setDate(date.getDate() + 7); // Ensure it's the next week

                // Create an event for the next 4 occurrences (4 weeks)
                for (let i = 0; i < 4; i++) {
                    events.push({
                        title: `${employee.firstName} ${employee.lastName}`,
                        start: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i * 7).toISOString().split('T')[0],
                    });
                }
            }
        });
    });

    return events;
};

// Function to send schedules to the database
export const sendSchedulesToDatabase = async (schedules) => {
    try {
        await axios.post('http://localhost:5001/api/schedules', schedules);
        console.log('Schedules successfully sent to the database');
    } catch (error) {
        console.error("Failed to send schedules", error);
    }
};

// Function to fetch schedules from the database
export const fetchSchedulesFromDatabase = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/schedules');
        return response.data; // Assuming this is the format that FullCalendar can use
    } catch (error) {
        console.error("Failed to fetch schedules", error);
        return []; // Return an empty array in case of an error
    }
};
