import express from 'express';
import fs from 'fs';
import {AlleVeranstaltungen as AlleVeranstaltungenRaw} from './temp-data.js';
import NeueVeranstaltungsId from './IDGenerator.js';
import testdatengenerator from './testdatengenerator.js';
import externeveranstaltung from './externeveranstaltung.js';


let AlleVeranstaltungen = AlleVeranstaltungenRaw;

const app = express ();
app.use(express.json());
app.use(testdatengenerator);
app.use (externeveranstaltung);


// Test, "historischer Codeschnipsel"
app.get('/hello', (req, res) => {
    res.send('Hello!');
});

// Api für alle Veranstaltungen
app.get('/api/veranstaltungen', (req, res) => {
    const Veranstaltungsausgabe = AlleVeranstaltungen.slice().sort((a, b) => {      
        return new Date(b.Zeitstempel) - new Date(a.Zeitstempel);
        });
    
    res.json(Veranstaltungsausgabe);
});

// Api für nicht genehmigte Veranstaltungen
app.get('/api/veranstaltungen/nicht-genehmigt', (req, res) => {
    const nichtgenehmigteveranstaltungen = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.genehmigung === false);

    const Veranstaltungsausgabe = nichtgenehmigteveranstaltungen.slice().sort((a, b) => {      
        return new Date(b.Zeitstempel) - new Date(a.Zeitstempel);
        });

    res.status(200).json(Veranstaltungsausgabe);
})

// Api für genehmigte Veranstaltungen
app.get('/api/veranstaltungen/genehmigt', (req, res) => {
    const veranstaltung = AlleVeranstaltungen.filter((veranstaltung) => {return veranstaltung.genehmigung === true});

    const Veranstaltungsausgabe = veranstaltung.slice().sort((a, b) => {      
        return new Date(b.Zeitstempel) - new Date(a.Zeitstempel);
        });

    res.status(200).json(Veranstaltungsausgabe);
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
    try {  
    const timestamp = new Date();                                                           // Erstellen des Timestamps                
     
    const Mussfeld = ['name', 'datum', 'ort', 'beschreibung'];                              //'name', 'datum', 'ort', 'beschreibung' dürfen nicht leer sein. Preis darf leer sein, da der Preis auch noch nicht festgelegt sein kann, wenn eine Veranstaltung erstellt wird.
    const Fehlfeld = Mussfeld.filter(field => !(field in req.body) || req.body[field].trim() === '');

    if (Fehlfeld.length > 0) {
        return res.status(400).json({ error: `Fehlende oder leere Felder: ${Fehlfeld.join(', ')}` });
    }
                                                                                            // JSON:
    const neueVeranstaltung = {                                                             // {
            id: NeueVeranstaltungsId(AlleVeranstaltungen).toString(),                       //
            name: req.body.name,                                                            // "name": "ein Name",
            datum: req.body.datum,                                                          // "datum": "TT.MM.JJJJ",
            ort: req.body.ort,                                                              // "ort": "ein Ort",
            preis: req.body.preis,                                                          // "preis": "1.23"
            beschreibung: req.body.beschreibung,                                            // "beschreibung": "eine Beschreibung"
            genehmigung: req.body.genehmigung || false,                                     // "genehmigung": wenn nicht anders angegeben: false
            Zeitstempel: timestamp.toISOString(),                                           // Zeitstempel
        };                                                                                  // }

        AlleVeranstaltungen.push(neueVeranstaltung);

        const Veranstaltungsausgabe = AlleVeranstaltungen.slice().sort((a, b) => {      
            return new Date(b.Zeitstempel) - new Date(a.Zeitstempel);
            });

        res.status(201).json(Veranstaltungsausgabe);
    } catch (error) {
        console.error('Fehler beim Parsen des JSON-Objekts:', error);
        res.status(400).json({ error: 'Ungültiges JSON-Format' });
    }
});

//API zum Bearbeiten einer Veranstaltung

app.put('/api/veranstaltungen/:veranstaltungId', (req, res) => {
    try {
        const veranstaltungId = req.params.veranstaltungId;
        const bearbeiteteVeranstaltungIndex = AlleVeranstaltungen.findIndex(veranstaltung => veranstaltung.id === veranstaltungId);

        if (bearbeiteteVeranstaltungIndex === -1) {
            res.status(404).json({ error: '404: Keine Veranstaltung gefunden' });
            return;
        }

        const { id, ...rest } = req.body;                                   // ID kann nicht bearbeitet werden

        const Bearbeitungszeitpunkt = new Date();                           // Zeitstempel für Bearbeitungszeitpunkt

        const Mussfeld = ['name', 'datum', 'ort', 'beschreibung'];
        const Fehlfeld = Mussfeld.filter(field => !(field in req.body) || req.body[field].trim() === '');
    
        if (Fehlfeld.length > 0) {
            return res.status(400).json({ error: `Fehlende oder leere Felder: ${Fehlfeld.join(', ')}` });
        }

        const bearbeiteteVeranstaltung = {
            id: veranstaltungId,
            Zeitstempel: Bearbeitungszeitpunkt.toISOString(),
            ...rest,
        };

        AlleVeranstaltungen[bearbeiteteVeranstaltungIndex] = bearbeiteteVeranstaltung;

        const Veranstaltungsausgabe = AlleVeranstaltungen.slice().sort((a, b) => {
            return new Date(b.Zeitstempel) - new Date(a.Zeitstempel);
        });

        res.status(200).json(Veranstaltungsausgabe);
    } catch (error) {
        console.error('Fehler beim Bearbeiten der Veranstaltung:', error);
        res.status(400).json({ error: 'Ungültiges JSON-Format oder Fehler beim Bearbeiten der Veranstaltung' });
    }
});

// Suche
app.get('/api/suche/:status', (req, res) => {
    const { stichwort } = req.query;
    const veranstaltungen = AlleVeranstaltungen;
    const status = req.params.status;
    let gefundeneVeranstaltungen = [];

    if (!stichwort) {
        return res.status(400).json({ error: 'Suchbegriff fehlt' });
    }
    switch (status) {
        case "genehmigt":
             gefundeneVeranstaltungen = veranstaltungen.filter((veranstaltung) =>
                {return veranstaltung.genehmigung === true && 
                (veranstaltung.name.toLowerCase().includes(stichwort.toLowerCase()) ||
                veranstaltung.ort.toLowerCase().includes(stichwort.toLowerCase()))}
            );
            break;

            case "nicht-genehmigt":
                gefundeneVeranstaltungen = veranstaltungen.filter((veranstaltung) =>
                   {return veranstaltung.genehmigung === false && 
                   (veranstaltung.name.toLowerCase().includes(stichwort.toLowerCase()) ||
                   veranstaltung.ort.toLowerCase().includes(stichwort.toLowerCase()))}
               );
            break;
    
        default:
            break;
    }
    

    if (gefundeneVeranstaltungen.length === 0) {
        return res.json({ message: 'Keine Veranstaltungen gefunden' });
    }

    res.json(gefundeneVeranstaltungen);
});

 // Veranstaltung genehmigen
 app.put('/api/veranstaltungen/genehmigen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find(veranstaltung => veranstaltung.id === veranstaltungId);

    if (!veranstaltung) {
        return res.status(404).json({ error: '404: Keine Veranstaltung gefunden' });
    }

    if (veranstaltung.genehmigung) {
        return res.status(400).json({ error: '400: Veranstaltung bereits genehmigt' });
    }

    veranstaltung.genehmigung = true;
    veranstaltung.Zeitstempel = new Date().toISOString();

    // Audit-Eintrag erstellen
    const auditEntry = `Veranstaltung ${veranstaltungId} wurde genehmigt am ${veranstaltung.Zeitstempel}\n`;

    fs.appendFile('audit.txt', auditEntry, (err) => {
        if (err) {
            console.error('Fehler beim Schreiben des Audit-Eintrags:', err);
            return res.status(500).json({ error: '500: Interner Serverfehler beim Schreiben des Audit-Eintrags' });
        }
        console.log('Änderung protokolliert.');
    });

    res.status(200).json(veranstaltung);
});


 // Veranstaltung löschen
app.delete('/api/veranstaltungen/:veranstaltungId', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;

    AlleVeranstaltungen = AlleVeranstaltungen.filter(veranstaltung => veranstaltung.id !== veranstaltungId);
    res.json(AlleVeranstaltungen)
})



//Aufgabe 3
//Format der Anfrage:
//{
//    "highlights": [
//      {
//        "überschrift": "Highlight 1",
//        "beschreibung": "Es passieren Dinge 1"
//      },
//      {
//        "überschrift": "Highlight 2",
//        "beschreibung": "Es passieren Dinge 2"
//      }
//    ]
//  }


app.post('/api/veranstaltungen/:veranstaltungId/highlights', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find((v) => v.id === veranstaltungId);
  
    if (!veranstaltung) {
      return res.status(404).json({ error: 'Veranstaltung nicht gefunden' });                       //  404, falls Veranstaltung mit gewählter ID nicht existiert 
    }
  
    const highlights = req.body.highlights;
  
    if (!highlights || !Array.isArray(highlights)) {
      return res.status(400).json({ error: 'Highlights erforderlich und müssen ein Array sein' });  // 400, falls die Highlights nicht im richtigen Format übergeben werden
    }
  
    const neuesHighlights = [];
  
    for (const highlight of highlights) {
      const { überschrift, beschreibung } = highlight;
  
      if (!überschrift || !beschreibung) {
        return res.status(400).json({ error: 'Überschrift und Beschreibung erforderlich' });        // Highlight darf nicht leer sein
      }
  
      const neuesHighlightsHighlight = { überschrift, beschreibung };                               // Highlights werden übergeben
      veranstaltung.highlights.push(neuesHighlightsHighlight); 
      neuesHighlights.push(neuesHighlightsHighlight);
      veranstaltung.highlightmenge = veranstaltung.highlights.length;
    }
  
    res.status(201).json(neuesHighlights);
  });
  
// Highlight anzeigen

app.get('/api/veranstaltungen/:veranstaltungId/highlights', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find((v) => v.id === veranstaltungId);

    if (!veranstaltung) {
        return res.status(404).json({ error: 'Veranstaltung nicht gefunden' });
    }

    const highlights = veranstaltung.highlights;

    res.status(200).json(highlights);
});

// Highlights bearbeiten
app.put('/api/veranstaltungen/:veranstaltungId/highlights', (req, res) => {
    const veranstaltungId = req.params.veranstaltungId;
    const veranstaltung = AlleVeranstaltungen.find((v) => v.id === veranstaltungId);
  
    if (!veranstaltung) {
      return res.status(404).json({ error: 'Veranstaltung nicht gefunden' });
    }
  
    const neueHighlights = req.body.highlights;
  
    if (!neueHighlights || !Array.isArray(neueHighlights)) {
      return res.status(400).json({ error: 'Highlights erforderlich und müssen ein Array sein' });
    }
  
    veranstaltung.highlights = neueHighlights;
    veranstaltung.highlightmenge = neueHighlights.length;
  
    res.status(200).json(veranstaltung.highlights);
});


// Port anzeige in Konsole
app.listen(8000, ()=> {
    console.log('Server is listening on port 8000')
});