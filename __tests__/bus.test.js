const request = require('supertest');
const app = require('../index');
const busDetails = require('../model/bus');
const { constants } = require('../constants');

jest.mock('../model/bus');

describe('Bus API', () => {
  let busData = {
    busNum: '1234',
    busType: 'AC',
    startCity: 'Mumbai',
    destination: 'Pune',
    totalSeats: 50,
    availableSeats: 50,
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/buses', () => {
    it('should return all buses', async () => {
      const mockedBusDetails = jest.spyOn(busDetails, 'find');
      mockedBusDetails.mockResolvedValue([busData]);

      const response = await request(app).get('/api/buses');
      
      expect(response.status).toBe(constants.SUCCESSFULL_REQUEST);
      expect(response.body).toEqual([busData]);
      expect(mockedBusDetails).toHaveBeenCalledTimes(1);
    });
  });

  
  describe('POST /api/buses', () => {
    it('should create a new bus', async () => {
      const mockedBusSave = jest.spyOn(busDetails.prototype, 'save');
      mockedBusSave.mockResolvedValue(busData);

      const response = await request(app)
        .post('/api/buses')
        .send(busData);

      expect(response.status).toBe(constants.SUCCESSFULL_POST);
      expect(response.body).toEqual(busData);
      expect(mockedBusSave).toHaveBeenCalledTimes(1);
    });

    it('should return validation error when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/buses')
        .send({});

      expect(response.status).toBe(constants.VALIDATION_ERROR);
      expect(response.body).toEqual({ message: "All fields are required" });
    });
  });




  describe('GET /api/buses/:id', () => {
    it('should get a specific bus with the provided Id ', async () => {
      const mockedBusDetails = jest.spyOn(busDetails, 'findById');
      mockedBusDetails.mockResolvedValue(busData);

      const response = await request(app).get('/api/buses/1');
      
      expect(response.status).toBe(constants.SUCCESSFULL_REQUEST);
      expect(response.body).toEqual(busData);
      expect(mockedBusDetails).toHaveBeenCalledWith('1');
      expect(mockedBusDetails).toHaveBeenCalledTimes(1);
    });
  });


  describe('PUT /api/buses/:id', () => {
    it('should update a specific bus with the provided Id', async () => {
      const mockedBusDetails = jest.spyOn(busDetails, 'findByIdAndUpdate');
      mockedBusDetails.mockResolvedValue(busData);

      const response = await request(app)
        .put('/api/buses/1')
        .send(busData);

      expect(response.status).toBe(constants.SUCCESSFULL_REQUEST);
      expect(response.body).toEqual(busData);
      expect(mockedBusDetails).toHaveBeenCalledWith('1', busData, { new: true });
      expect(mockedBusDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/buses/:id', () => {
    it('should delete a specific bus with the provided Id', async () => {
      const mockedBusDetails = jest.spyOn(busDetails, 'findByIdAndDelete');
      mockedBusDetails.mockResolvedValue(busData);

      const response = await request(app).delete('/api/buses/1');

      expect(response.status).toBe(constants.SUCCESSFULL_REQUEST);
      expect(response.body).toEqual(busData);
      expect(mockedBusDetails).toHaveBeenCalledWith('1');
      expect(mockedBusDetails).toHaveBeenCalledTimes(1);
    });
  });

});

