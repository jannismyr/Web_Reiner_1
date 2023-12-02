import express from 'express';
import {AlleVeranstaltungen as AlleVeranstaltungenRaw} from './temp-data.js'

let AlleVeranstaltungen = AlleVeranstaltungenRaw;

const app = express ();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello!');
});
app.get('/api/veranstaltungen', (req, res) => {
    res.json(AlleVeranstaltungen);
});

app.get('/api/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find(veranstaltung => veranstaltung.id === veranstaltungId);
    res.json(veranstaltung);
});

app.post('/api/veranstaltungen', (req, res) => {

    console.log('Vor dem Hinzufügen', AlleVeranstaltungen);
    
    const neueVeranstaltung = {                                                             //Eingabeformat: JSON
       id: req.body.id,                                                                     // "id": "neueID",                                                                  // 
       name: req.body.name,                                                                 // "name": "Meine Veranstaltung",
       datum: req.body.datum,                                                               // "datum": "TT.MM.JJJJ",
       ort: req.body.ort,                                                                   // "ort": "ein Ort"
       preis: req.body.preis,                                                               // "preis": 12.34
       genehmigung: req.body.genehmigung,                                                   // "genehmigung": true/false
          };
 
    AlleVeranstaltungen.push(neueVeranstaltung);

    console.log('Nach dem Hinzufügen', AlleVeranstaltungen);

    res.json(AlleVeranstaltungen);
 });
 
 

app.delete('/api/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    AlleVeranstaltungen = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.id !== veranstaltungId);
    res.json(AlleVeranstaltungen)
})

app.listen(8000, ()=> {
    console.log('Server is listening on port 8000')
});