const moment = require('moment');
const Event = require('../models/Events'); // Ensure this path is correct

function generateDatesForSelectedDays(year, month, selectedDaysOfWeek) {
  const dates = [];
  const startOfMonth = moment([year, month - 1]);
  const endOfMonth = moment(startOfMonth).endOf('month');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  selectedDaysOfWeek.forEach(dayOfWeek => {
    let currentDate = startOfMonth.clone().day(dayOfWeek);
    if (currentDate.isBefore(startOfMonth)) {
      currentDate.add(7, 'days');
    }

    while (currentDate.isSameOrBefore(endOfMonth)) {
      dates.push(currentDate.toDate());
      currentDate.add(1, 'week');
    }
  });

  return dates;
}

async function storeEventsForEmployee(employeeId, year, month, selectedDaysOfWeek) {
  const eventDates = generateDatesForSelectedDays(year, month, selectedDaysOfWeek);
  const eventsToSave = eventDates.map(date => {
    return {
      title: 'Available', // Or any other title you prefer
      start: date,
      employeeId
    };
  });

  // Save all events to the database
  try {
    await Event.insertMany(eventsToSave);
    console.log('Events created successfully');
  } catch (error) {
    console.error('Error creating events:', error);
  }
}

// Don't forget to export storeEventsForEmployee if you intend to call it from elsewhere
module.exports = { storeEventsForEmployee };
