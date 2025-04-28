const mongoose = require('mongoose');

async function dbConn() {
    const conn = await mongoose.connect('mongodb+srv://agarwalharsh8909:Harsh123@harsh.3kn84aw.mongodb.net/studentapp?retryWrites=true&w=majority&appName=HARSH');
    if (conn) {
        console.log('database connect successfully');
    } else {
        console.log('connection fail');
    }
}

module.exports = dbConn;