const eventService = require('../services/eventService');

exports.createEmployeeEvents = async (req, res) => {
  const { employeeId, year, month, selectedDaysOfWeek } = req.body;
  
  try {
    await eventService.storeEventsForEmployee(employeeId, year, month, selectedDaysOfWeek);
    res.status(200).send('Events created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
