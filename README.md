# BusTicket_App
This is the backend portion of the Bus Ticket Application.
The application is designed to handle ticket booking and management for bus transportation companies. It provides a set of APIs that allow users to create, read, update, and delete ticket data, as well as manage bus schedules and availability.
Users can signUp and logIn as either an admin or a regular user. Both types of users can signUp and logIn separately.

## Installation and Setup
- Clone the repository from GitHub.
- Install dependencies by running `npm install`.
- Create a `.env` file and add the necessary environment variables 
- Run `npm start` to start the server.
## Endpoints
### Bus Routes
`GET /api/busesList` - get a list of all buses
`GET /api/busesList/:id` - get details of a specific bus
`POST /api/busesList` - create a new bus (admin only)
`PUT /api/busesList/:id` - update bus details (admin only)
`DELETE /api/busesList/:id` - delete a bus (admin only)
### User Routes
`POST /api/users/register` - register a new user
`POST /api/users/login` - login an existing user
`GET /api/users/profile` - get the user profile (authenticated user only)
### Swagger Documentation
`GET /api-docs` - view Swagger documentation for the API
## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- Swagger UI Express

### Unit Testing and Installing Jest 
##### Installing Jest:
`npm install --save-dev jest`
-  Unit tests are written in separate files with the extension .`test.js`.
- To run the unit tests `npm test`