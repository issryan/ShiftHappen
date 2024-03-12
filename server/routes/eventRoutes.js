const router = require('express').Router();
const Event = require('../models/Events');


router.get('/forCalendar', async (req, res) => {
  const { start, end } = req.query;
  try {
      const events = await Event.find({
          start: { $gte: new Date(start), $lt: new Date(end) },
      });
      res.json(events);
  } catch (error) {
      res.status(500).send({ message: "Error fetching events", error });
  }
});



module.exports = router;