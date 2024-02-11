const notes = require('express').Router();
const fs = require('fs')
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');
const { v4: uuidv4 } = require('uuid');


const readDbFile = ()=>{
    data = fs.readFileSync(dbPath)
    return JSON.parse(data)
}

const writeDbFile = (data)=>{
    fs.writeFileSync(dbPath, JSON.stringify(data));
}


notes.get('/', (req, res) => {
    const db = readDbFile();
    res.status(200).json(db)
});

notes.post('/', (req, res) => {
    let {title, text} = req.body
    if (title && text){
        db = readDbFile();
        db.push({"title":title,"text":text,"id":uuidv4()});
        writeDbFile(db);
        respond = {"status":"success","saved_title":title,"saved_text":text}
        res.status(201).json(respond)
    }
    else{
        return res.status(500).json({"error":"title or text are missing"})
    }

})

notes.delete('/:id', (req, res) => {
    const idToDelete = req.params.id;
    db = readDbFile();
    const updatedDb = db.filter(note => note.id != idToDelete);
    writeDbFile(updatedDb);
    res.status(200).json({"status":"success","deleted_id":idToDelete})
})

module.exports = notes;




