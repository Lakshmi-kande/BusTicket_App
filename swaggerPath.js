/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Use this endpoint to register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *               gender:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registration successful
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email and password
 *     tags: [Users]
 *     requestBody:
 *       description: Login user with email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: invalid request
 *       401:
 *         description: Unauthorized
 */




/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all bus list
 *     description: Returns a list of all available buses.
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *       400:
 *         description: Invalid request 
 */


/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus details
 *     description: Create a new bus record with the given details
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNum:
 *                 type: string
 *               busType:
 *                 type: string
 *               startCity:
 *                 type: string
 *               destination:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *               availableSeats:
 *                 type: integer
 *             example:
 *               busNum: "B001"
 *               busType: "Sleeper"
 *               startCity: "Mumbai"
 *               destination: "Pune"
 *               totalSeats: 30
 *               availableSeats: 30
 *     responses:
 *       '201':
 *         description: Bus details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the newly created bus record
 *                 busNum:
 *                   type: string
 *                 busType:
 *                   type: string
 *                 startCity:
 *                   type: string
 *                 destination:
 *                   type: string
 *                 totalSeats:
 *                   type: integer
 *                 availableSeats:
 *                   type: integer
 *             example:
 *               _id: "609170d64c9ac313185ddca4"
 *               busNum: "B001"
 *               busType: "Sleeper"
 *               startCity: "Mumbai"
 *               destination: "Pune"
 *               totalSeats: 30
 *               availableSeats: 30
 *       '400':
 *         description: Invalid request 
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */


/**
 * @swagger
 *
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus details by Id
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Id of the bus to get details
 *     responses:
 *       200:
 *         description: The bus details were successfully retrieved
 *       404:
 *         description: The bus with the specified ID was not found
 */


/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update bus details
 *     description: Update the details of an existing bus
 *     tags: [Buses] 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of the bus to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New bus details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNum:
 *                 type: string
 *               busType:
 *                 type: string
 *               startCity:
 *                 type: string
 *               destination:
 *                 type: string
 *               totalSeats:
 *                 type: number
 *               availableSeats:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bus details updated successfully
 *       404:
 *         description: Bus not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 *
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete bus details
 *     description: Delete bus details based on ID
 *     tags: [Buses] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the bus to delete
 *     responses:
 *       200:
 *         description: The bus was successfully deleted
 *       404:
 *         description: The bus with the specified ID was not found
 */



