const asyncHandler = require('express-async-handler');
const busDetails = require('../model/bus');
const { constants } = require('../constants');

//@desc Get all bus list
//@route GET /api/busesList
//@access private
const getAllBusList = asyncHandler(async (req, res) => {
    const busesList = await busDetails.find({ busId: req.bus.id });
    res.status(constants.SUCCESSFULL_REQUEST).json(busesList);
});

//@desc Create New Bus Details
//@route POST /api/busesList
//@access private
const createBusDetails = asyncHandler(async (req, res) => {
    console.log('The request body is :', req.body);
    const { 
        busNum,
        busType, 
        startCity, 
        destination, 
        totalSeats, 
        availableSeats
    } = req.body;
    if ( !busNum || !busType || !startCity || !destination ||! totalSeats || !availableSeats ) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('All fields are mandatory !');
    }
    const busList = await busDetails.create({
        busNum,
        busType, 
        startCity, 
        destination, 
        totalSeats, 
        availableSeats,
        bus_id: req.bus.id
    });

    res.status(constants.SUCCESSFULL_POST).json(busList);
});

//@desc Get bus details
//@route GET /api/busesList/:id
//@access private
const getBusDetails = asyncHandler(async (req, res) => {
    const busList = await busDetails.findById(req.params.id);
    if (!busList) {
        res.status(constants.NOT_FOUND);
        throw new Error('Bus details not found');
    }
    res.status(constants.SUCCESSFULL_REQUEST).json(busList);
});

//@desc update bus details
//@route PUT /api/busesList/:id
//@access private
const updateBusDetails = asyncHandler(async (req, res) => {
    const busList = await busDetails.findById(req.params.id);
    if (!busList) {
        res.status(constants.NOT_FOUND);
        throw new Error('Bus details not found');
    }

    if (busList.busId.toString() !== req.user.id) {
        res.status(constants.FORBIDDEN);
        throw new Error('User dont have permission to update the bus details');
    }

    const updatedBusDetails = await busList.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(constants.SUCCESSFULL_REQUEST).json(updatedBusDetails);
});

//@desc delete bus details
//@route DELETE /api/busesList/:id
//@access private
const deleteBusDetails = asyncHandler(async (req, res) => {
    const busList = await busDetails.findById(req.params.id);
    if (!busList) {
        res.status(constants.NOT_FOUND);
        throw new Error('bus details not found');
    }
    if (busList.busId.toString() !== req.user.id) {
        res.status(constants.FORBIDDEN);
        throw new Error('User dont have permission to delete bus details');
    }
    await busDetails.deleteOne({ _id: req.params.id });
    res.status(constants.SUCCESSFULL_REQUEST).json(busList);
});

module.exports = {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails
};