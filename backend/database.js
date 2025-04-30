const mongoose = require('mongoose');

async function dbConn() {
    try {
        const conn = await mongoose.connect('mongodb+srv://agarwalharsh8909:Harsh123@harsh.3kn84aw.mongodb.net/studentapp?retryWrites=true&w=majority&appName=HARSH', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = dbConn;