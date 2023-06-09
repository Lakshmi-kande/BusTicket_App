const asyncHandler = require('express-async-handler');
const busDetails = require('../model/bus');
const { constants } = require('../constants');

//@desc Get all bus list
//@route GET /api/buses
//@access private
const getAllBusList = asyncHandler(async (req, res) => {
    const busesList = await busDetails.find({});
    res.status(constants.SUCCESSFULL_REQUEST).json(busesList);
});

//@desc Create New Bus Details
//@route POST /api/buses
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
        res.status(constants.VALIDATION_ERROR).json({ message: "All fields are required" });;
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
    const result = await bus.save();

    res.status(constants.SUCCESSFULL_POST).json(result);
});

//@desc Get bus details
//@route GET /api/busesList/:id
//@access private
const getBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        res.status(constants.NOT_FOUND).json({message: "bus details not found"});
    }

    res.status(constants.SUCCESSFULL_REQUEST).json(bus);
});

//@desc update bus details
//@route PUT /api/busesList/:id
//@access private
const updateBusDetails = asyncHandler(async (req, res) => { 
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        return res.status(constants.NOT_FOUND).json({ message: 'Bus not found' });;
    }

    const updatedBusDetails = await busDetails.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(constants.SUCCESSFULL_REQUEST).json(updatedBusDetails);
});

//@desc delete bus details
//@route DELETE /api/busesList/:id
//@access private
const deleteBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        throw new Error(constants.NOT_FOUND);
    }

    await bus.deleteOne({ _id: req.params.id });

    res.status(constants.SUCCESSFULL_REQUEST).json({message:'deleted successfully'});
});

module.exports = {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails
};