const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    busNum: {
        type: String, 
        required: true 
    }, 
    busType: { 
        type: String, 
        required: true 
    },
    startCity: {
        type: String, 
        required: true
    },
    destination: {
        type: String, 
        required: true
    },
    totalSeats: {
        type: String, 
        required: true
    },
    availableSeats: {
        type: String, 
        required: true
    },
},{
    timestamps: true,
});

const bus = mongoose.model('bus', busSchema);

module.exports = bus;
