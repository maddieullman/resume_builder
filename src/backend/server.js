import express from 'express';
import { join } from 'path';
import bodyParser from 'body-parser';
import PouchDB from 'pouchdb';
import cors from 'cors'; 

const app = express();
const port = process.env.PORT || 3001;
const db = new PouchDB('resumes');

app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static(join(new URL('.', import.meta.url).pathname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'index.html'));
});

//Create
app.post('/api/resumes', async (req, res) => {
    try {
        const result = await db.post(req.body);
        res.status(201).json(result);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error creating resume', error });
    }
});

//Read
app.get('/api/resumes', async (req, res) => {
    try {
        const result = await db.allDocs({ include_docs: true });
        const resumes = result.rows.map(row => row.doc);
        res.status(200).json(resumes);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching resumes', error });
    }
});

//Update
app.put('/api/resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedResume = req.body;
        const resume = await db.get(id); 
        const result = await db.put({ _id: id, _rev: resume._rev, ...updatedResume });
        res.json({ success: true, result });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE 
app.delete('/api/resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await db.get(id); 
        const result = await db.remove(resume);
        res.json({ success: true, result });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.use((err, res) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err });
});

//starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
