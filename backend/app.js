const express = require('express')
const cors = require('cors')
const database = require('./database');
const Student = require('./studentmodel');
const fs= require('fs/promises')
const app = express()
let users =[];

// Initialize database connection
database();

// Middleware
app.use(express.json())
app.use(cors())

// const readdata=async ()=>{
//     users=JSON.parse(await fs.readFile('./data.json','utf8'))
// }
// const writedata=async ()=>{
//    await fs.writeFile('./data.json',JSON.stringify(users))
// }
// readdata();

// Routes
app.get('/users', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: 'Error fetching students' });
    }
})

app.post('/users', async (req, res) => {
    try {
        const sdata = req.body;
        // Generate a unique ID
        const id = Math.floor(Math.random() * 1000);
        sdata.id = id;
        
        const newStudent = await Student.create(sdata);
        res.status(201).json({ 
            message: "Data added successfully",
            student: newStudent
        });
    } catch (err) {
        console.error('Error creating student:', err);
        res.status(500).json({ 
            message: 'Error creating student',
            error: err.message 
        });
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const { name, age } = req.body;
        
        const student = await Student.findOne({ id: uid });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        await Student.updateOne({ id: uid }, { name, age });
        res.status(200).json({ message: 'Data updated successfully' });
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ 
            message: 'Error updating student',
            error: err.message 
        });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const uid = parseInt(req.params.id);
        const student = await Student.findOne({ id: uid });
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        await Student.deleteOne({ id: uid });
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ 
            message: 'Error deleting student',
            error: err.message 
        });
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});