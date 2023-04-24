const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    busId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
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
});

const bus = mongoose.model('bus', busSchema);

module.exports = bus;
