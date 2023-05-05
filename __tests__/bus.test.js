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
        status: jest.fn().mockReturnThis(),json: jest.fn()
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



describe('createBusDetails', () => {
  test('should return a new bus details object', async () => {
    const mockBusDetails = {
      busNum: '123',
      busType: 'AC',
      startCity: 'Mumbai',
      destination: 'Pune',
      totalSeats: 50,
      availableSeats: 50,
      busId: 'bus-123'
    };

    busDetails.mockResolvedValueOnce(mockBusDetails);

    const req = {
      body: {
        busNum: '123',
        busType: 'AC',
        startCity: 'Mumbai',
        destination: 'Pune',
        totalSeats: 50,
        availableSeats: 50,
        id: 'bus-123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),json: jest.fn()
    };

    await createBusDetails(req, res);

    expect(busDetails).toHaveBeenCalledTimes(1);
    expect(busDetails).toHaveBeenCalledWith({
      busNum: '123',
      busType: 'AC',
      startCity: 'Mumbai',
      destination: 'Pune',
      totalSeats: 50,
      availableSeats: 50,
      busId: 'bus-123'
    });

    expect(mockBusDetails.save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(constants.SUCCESSFULL_POST);
    expect(res.json).toHaveBeenCalledWith(mockBusDetails);
  });

  it('should throw an error if required fields are missing', async () => {
    const req = {
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await expect(createBusDetails(req, res)).rejects.toThrow(constants.VALIDATION_ERROR);
  });
});





