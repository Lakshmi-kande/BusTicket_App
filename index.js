const express = require('express');
const connectDb = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/busesList', require('./routes/busRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});