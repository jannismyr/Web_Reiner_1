import express from 'express';
import {Veranstaltungen} from './temp-data.js'

const app = express ();

app.get('/hello', (req, res) => {
    res.send('Hello!');
});
app.get('/Veranstaltungen', (req, res) => {
    res.json(Veranstaltungen);
});
app.listen(8000, ()=> {
    console.log('Server is listening on port 8000')
});