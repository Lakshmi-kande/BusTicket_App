const mongoose = require ('mongoose');
const connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.connect_URL);
        const message = `Database connected: ${connect.connection.host} ${connect.connection.name}`;
        console.log(message);
    } catch(err) {
        return (err);
    }
};

module.exports = connectDb;