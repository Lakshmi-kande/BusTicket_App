const express = require('express');
const router = express.Router();
const {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails
} = require('../controllers/busController');
// const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
router.route('/').get(getAllBusList).post(createBusDetails);
router.route('/:id').get(getBusDetails).put(updateBusDetails).delete(deleteBusDetails);

module.exports = router;