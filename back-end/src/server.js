import express from 'express';
import {AlleVeranstaltungen as AlleVeranstaltungenRaw} from './temp-data.js';
import NeueVeranstaltungsId from './IDGenerator.js';

let AlleVeranstaltungen = AlleVeranstaltungenRaw;

const app = express ();
app.use(express.json());


// Test, "historischer Codeschnipsel"
app.get('/hello', (req, res) => {
    res.send('Hello!');
});

// Api für alle Veranstaltungen
app.get('/api/veranstaltungen', (req, res) => {
    res.json(AlleVeranstaltungen);
});
// Api für nicht genehmigte Veranstaltungen
app.get('/api/veranstaltungen/nicht-genehmigt', (req, res) => {
    const veranstaltung = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.genehmigung === false);
    res.json(veranstaltung)
})
// Api für genehmigte Veranstaltungen
app.get('/api/veranstaltungen/genehmigt', (req, res) => {
    const veranstaltung = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.genehmigung === true);
    res.json(veranstaltung)
})

// Api für bestimmte Veranstaltung
app.get('/api/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find(veranstaltung => veranstaltung.id === veranstaltungId);
    

    switch (true) {
        case veranstaltung !== undefined:
            res.status(200).json(veranstaltung);
            break;
        case veranstaltung === undefined:
            res.status(404).json({ error: '404: Keine Veranstaltung gefunden' });
            break;
        default:
            res.status(500).json({ error: '500: Interner Serverfehler' });
    } //HTTP 200, 404 und 500
});


// Neue Veranstaltung erstellen
app.post('/api/veranstaltungen', (req, res) => {                                            //Übergabeformat:
    try {                                                                                   //JSON
        const neueVeranstaltung = {                                                         // {
            id: NeueVeranstaltungsId(AlleVeranstaltungen).toString(),                       //
            name: req.body.name,                                                            // "name": "ein Name",
            datum: req.body.datum,                                                          // "datum": "TT.MM.JJJJ",
            ort: req.body.ort,                                                              // "ort": "ein Ort",
            preis: req.body.preis,                                                          // "preis": "1.23"
            beschreibung: req.body.beschreibung,                                            // "beschreibung": "eine Beschreibung"
            genehmigung: req.body.genehmigung || false,                                     // "genehmigung": wenn nicht anders angegeben: false
        };                                                                                  // }

        AlleVeranstaltungen.push(neueVeranstaltung);

        res.status(201).json(AlleVeranstaltungen);
    } catch (error) {
        // Fehler beim Parsen des JSON-Objekts
        console.error('Fehler beim Parsen des JSON-Objekts:', error);
        res.status(400).json({ error: 'Ungültiges JSON-Format' });
    }
});

// Suche für Genehmigte Veranstaltungen
app.get('/api/suche', (req, res) => {
    const stichwort = req.query.Name;

    console.log(stichwort)
    const veranstaltung = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.genehmigung === true);
    if (!stichwort) {
        return res.status(400).json({ error: 'Suchbegriff fehlt' });
    }

    const gefundeneVeranstaltungen = veranstaltung.filter(veranstaltung =>
        veranstaltung.name.toLowerCase().includes(stichwort.toLowerCase())
    );

    if (gefundeneVeranstaltungen.length === 0) {
        return res.json({ message: 'Keine Veranstaltungen gefunden' });
    }

    res.json(gefundeneVeranstaltungen);
});


 // Veranstaltung löschen

app.delete('/api/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    AlleVeranstaltungen = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.id !== veranstaltungId);
    res.json(AlleVeranstaltungen)
})
// Port anzeige in Konsole
app.listen(8000, ()=> {
    console.log('Server is listening on port 8000')
});