const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true,
        unique: true 
    },
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    age: { 
        type: Number, 
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;