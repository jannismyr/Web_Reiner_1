import express from 'express';
import {AlleVeranstaltungen as AlleVeranstaltungenRaw} from './temp-data.js'

let AlleVeranstaltungen = AlleVeranstaltungenRaw;

const app = express ();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello!');
});
app.get('/veranstaltungen', (req, res) => {
    res.json(AlleVeranstaltungen);
});

app.get('/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find(veranstaltung => veranstaltung.id === veranstaltungId);
    res.json(veranstaltung);
});

app.post('/veranstaltungen', (req, res) => {
   const veranstaltungId = req.body.id;
   const NewVeranstaltung  = AlleVeranstaltungen.find(veranstaltung => veranstaltung.id === veranstaltungId);
   AlleVeranstaltungen.push(NewVeranstaltung);
   res.json(AlleVeranstaltungen)
});

app.delete('/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    AlleVeranstaltungen = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.id !== veranstaltungId);
    res.json(AlleVeranstaltungen)
})

app.listen(8000, ()=> {
    console.log('Server is listening on port 8000')
});