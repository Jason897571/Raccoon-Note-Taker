const express = require('express');
const api = require('./routers/index.js');
const app = express();
const path = require('path');
const PORT = 3001;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);


app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))  
})

app.listen(PORT, () => {
    console.log(`API server now on http://localhost:${PORT}`);
})