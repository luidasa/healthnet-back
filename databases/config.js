// getting-started.js
const mongoose = require('mongoose');

const dbConnection = async (parameters) => {
    try {
        await mongoose.connect(parameters.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('BD online');
    } catch(err) {
        console.log(err);
        throw new Error('Error a la hora de inicia la bd ver logs');
    }
};

module.exports = {
    dbConnection
}