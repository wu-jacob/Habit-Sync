import express from 'express';
import * as db from './queries.js';
const app = express();
const port = 3001;
import { Storage } from '@google-cloud/storage';
import Multer from 'multer';

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no files larger than 5mb
    },
})

let projectId ="handy-cache-396503";
let keyFileName = "storage-key.json";

const storage = new Storage({
    projectId,
    keyFileName
})

const bucket = storage.bucket("habit-sync");

app.post("/upload", multer.single("imgfile"), (req, res) => {
    console.log("Made it /upload");
    try {
      if (req.file) {
        console.log("File found, trying to upload...");
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();
  
        blobStream.on("finish", () => {
          res.status(200).send("Success");
          console.log("Success");
        });
        blobStream.end(req.file.buffer);
      } else throw "error with img";
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:email', db.getUserByEmail) 
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/habits', db.getHabits)
app.get('/habits/:id', db.getHabitById)
app.post('/habits', db.createHabit)
app.delete('/habits/:id', db.deletHabit)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
