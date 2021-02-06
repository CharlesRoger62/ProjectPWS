const { Router } = require('express');
const TicketRouter = require('./tickets');
const RegionRouter = require('./regions');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/tickets', TicketRouter);
router.use('/regions', RegionRouter);

module.exports = router;
