const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const busDetails = require('../model/bus');
require('dotenv').config();

let db;

beforeAll(async () => {
  db = await mongoose.connect(process.env.connect_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
});

afterAll(async () => {
  await db.disconnect();
  await mongoose.connection.close();
});


describe('GET /api/buses', () => {
  it('should get all buses list', async () => {
    const res = await request(app).get('/api/buses');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  }, 10000);
});



describe('POST /api/buses', () => {
  
  it('should create a new bus details', async () => {
    const res = await request(app)
      .post('/api/buses')
      .send({
        busNum: '1234',
        busType: 'AC',
        startCity: 'Mumbai',
        destination: 'Pune',
        totalSeats: '50',
        availableSeats: '50'
      })
      expect(res.statusCode).toBe(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.busNum).toBe('1234');
    expect(res.body.busType).toBe('AC');
    expect(res.body.startCity).toBe('Mumbai');
    expect(res.body.destination).toBe('Pune');
    expect(res.body.totalSeats).toBe('50');
    expect(res.body.availableSeats).toBe('50');
  },10000);

  it('should return validation error if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/buses')
      .send({})
      .expect(400);

    expect(res.body).toEqual({ message: 'All fields are required' });
  });
});


describe('GET /api/buses/:id', () => {
  it('should get a specific bus with the provided Id ', async () => {
    const bus = new busDetails({
      busNum: '4321',
      busType: 'AC',
      startCity: 'Mumbai',
      destination: 'Pune',
      totalSeats: '50',
      availableSeats: '50'
    });
    await bus.save();

    const res = await request(app)
      .get(`/api/buses/${bus._id}`)
      .send({
        busNum: '4321',
        busType: 'AC',
        startCity: 'Mumbai',
        destination: 'Pune',
        totalSeats: '50',
        availableSeats: '50'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.busNum).toBe('4321');
    expect(res.body.busType).toBe('AC');
  });
});


describe('PUT /api/buses/:id', () => {
  it('should update a specific bus with the provided Id', async () => {
    const bus = new busDetails({
      busNum: '1234',
      busType: 'Non-AC',
      startCity: 'Mumbai',
      destination: 'Pune',
      totalSeats: '50',
      availableSeats: '50'
    });
    await bus.save();

    const res = await request(app)
      .put(`/api/buses/${bus._id}`)
      .send({
        busNum: '4321',
        busType: 'AC',
        startCity: 'Mumbai',
        destination: 'Pune',
        totalSeats: '50',
        availableSeats: '50'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.busNum).toBe('4321');
    expect(res.body.busType).toBe('AC');
  });
});



describe('DELETE /api/buses/:id', () => {
  it('should delete a bus with specific bus with the provided id', async () => {
    const bus = new busDetails({
      busNum: '1234',
      busType: 'Non-AC',
      startCity: 'Mumbai',
      destination: 'Pune',
      totalSeats: '50',
      availableSeats: '50'
    });
    await bus.save();

    const res = await request(app)
      .delete(`/api/buses/${bus._id}`)
      .send({
        busNum: '4321',
        busType: 'AC',
        startCity: 'Mumbai',
        destination: 'Pune',
        totalSeats: '50',
        availableSeats: '50'
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('deleted successfully');
  },10000);
});
