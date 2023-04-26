const express = require('express');
const connectDb = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/busesList', require('./routes/busRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

// swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bus Ticket API',
            version: '1.0.0',
            description: 'API documentation for the Bus Ticket application',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});