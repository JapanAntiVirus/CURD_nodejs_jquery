const express = require('express')
const app = express()
const port = 3000
const student = require('./student')
const body_parser = require('body-parser');
const cors = require('cors');

app.use(body_parser.json({limit: '50mb'}));
app.use(body_parser.urlencoded({extended: false, limit: '50mb'}));
app.use(cors({origin: true, credentials: true}));

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/student', student.getListStudent);
app.get('/api/student/:id', student.getStudentById);
app.post('/api/student/add', student.addStudent);
app.delete('/api/student/:id', student.deleteStudent);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));