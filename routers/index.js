const router = require('express').Router();

const notes = require('./notes');
// modular routers
router.use('/notes', notes);

module.exports = router;