const asyncHandler = require('express-async-handler');
const busDetails = require('../model/bus');
const { constants } = require('../constants');

//@desc Get all bus list
//@route GET /api/busesList
//@access private
const getAllBusList = asyncHandler(async (req, res) => {
    const busesList = await busDetails.find({ busId: req.body.id });
    res.status(constants.SUCCESSFULL_REQUEST).json(busesList);
});

//@desc Create New Bus Details
//@route POST /api/busesList
//@access private
const createBusDetails = asyncHandler(async (req, res) => {
    const {
        busNum,
        busType,
        startCity,
        destination,
        totalSeats,
        availableSeats
    } = req.body;

    if ( !busNum || !busType || !startCity || !destination || !totalSeats || !availableSeats) {
        throw new Error(constants.VALIDATION_ERROR);
    }

    const bus = new busDetails({
        busNum,
        busType,
        startCity,
        destination,
        totalSeats,
        availableSeats,
        busId: req.body.id
    });

    await bus.save();

    res.status(constants.SUCCESSFULL_POST).json(bus);
});

//@desc Get bus details
//@route GET /api/busesList/:id
//@access private
const getBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        throw new Error(constants.NOT_FOUND);
    }

    res.status(constants.SUCCESSFULL_REQUEST).json(bus);
});

//@desc update bus details
//@route PUT /api/busesList/:id
//@access private
const updateBusDetails = asyncHandler(async (req, res) => {
    const {
        busNum,
        busType,
        startCity,
        destination,
        totalSeats,
        availableSeats
    } = req.body;

    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        throw new Error(constants.NOT_FOUND);
    }

    if (req.user.role !== 'admin') {
        throw new Error(constants.FORBIDDEN);
    }

    bus.busNum = busNum || bus.busNum;
    bus.busType = busType || bus.busType;
    bus.startCity = startCity || bus.startCity;
    bus.destination = destination || bus.destination;
    bus.totalSeats = totalSeats || bus.totalSeats;
    bus.availableSeats = availableSeats || bus.availableSeats;

    await bus.save();

    res.status(constants.SUCCESSFULL_REQUEST).json(bus);
});

//@desc delete bus details
//@route DELETE /api/busesList/:id
//@access private
const deleteBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        throw new Error(constants.NOT_FOUND);
    }

    if (req.user.role !== 'admin') {
        throw new Error(constants.FORBIDDEN);
    }

    await bus.deleteOne({ _id: req.params.id });

    res.status(constants.SUCCESSFULL_REQUEST).json({message:'delete successfully'});
});

module.exports = {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails
};