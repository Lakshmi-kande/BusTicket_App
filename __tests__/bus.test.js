const busDetails = require('../model/bus');
const { constants } = require('../constants');

const {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails
} = require('../controllers/busController');

jest.mock('../model/bus');

describe('getAllBusList', () => {
    test('should return all buses list on successful api call', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const busList = [
            { busNum: '1', busType: 'AC', startCity: 'Mumbai', destination: 'Pune', totalSeats: 40, availableSeats: 20 },
            { busNum: '2', busType: 'Non-AC', startCity: 'Pune', destination: 'Mumbai', totalSeats: 50, availableSeats: 30 }
        ];

        busDetails.find.mockResolvedValue(busList);

        await getAllBusList(req, res);

        expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFULL_REQUEST);
        expect(res.json).toHaveBeenCalledWith(busList);
    });
});


