const asyncHandler = require('express-async-handler');
const busDetails = require('../model/bus');

//@desc Get all bus list
//@route GET /api/busesList
//@access private
const getAllBusList = asyncHandler(async (req, res) => {
    const busesList = await busDetails.find({ busId: req.bus.id });
    res.status(200).json(busesList);
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
        res.status(400);
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

    res.status(201).json(busList);
});

//@desc Get bus details
//@route GET /api/busesList/:id
//@access private
const getBusDetails = asyncHandler(async (req, res) => {
    const busList = await busDetails.findById(req.params.id);
    if (!busList) {
        res.status(404);
        throw new Error('Bus details not found');
    }
    res.status(200).json(busList);
});

//@desc update bus details
//@route PUT /api/busesList/:id
//@access private
const updateBusDetails = asyncHandler(async (req, res) => {
    const busList = await busDetails.findById(req.params.id);
    if (!busList) {
        res.status(404);
        throw new Error('Bus details not found');
    }

    if (busList.busId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User dont have permission to update the bus details');
    }

    const updatedBusDetails = await busList.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedBusDetails);
});

//@desc delete bus details
//@route DELETE /api/busesList/:id
//@access private
const deleteBusDetails = asyncHandler(async (req, res) => {
    const busList = await busDetails.findById(req.params.id);
    if (!busList) {
        res.status(404);
        throw new Error('bus details not found');
    }
    if (busList.busId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User dont have permission to delete bus details');
    }
    await busDetails.deleteOne({ _id: req.params.id });
    res.status(200).json(busList);
});

module.exports = {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails
};