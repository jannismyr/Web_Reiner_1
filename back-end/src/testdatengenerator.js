import express from 'express';
import { AlleVeranstaltungen as AlleVeranstaltungenRaw } from './temp-data.js';
import NeueVeranstaltungsId from './IDGenerator.js';

const router = express.Router();
let AlleVeranstaltungen = AlleVeranstaltungenRaw;

router.get('/api/testdatengenerator', (req, res) => {
    try {
        const timestamp = new Date();

        const neueVeranstaltung = {
            id: NeueVeranstaltungsId(AlleVeranstaltungen).toString(),
            name: 'Testveranstaltung',
            datum: '01.01.2023',
            ort: 'Testort',
            preis: '10.00',
            beschreibung: 'Eine automatisch generierte Testveranstaltung',
            genehmigung: false,
            Zeitstempel: timestamp.toISOString(),
        };

        AlleVeranstaltungen.push(neueVeranstaltung);
        
         const Veranstaltungsausgabe = AlleVeranstaltungen
            .slice()
            .sort((a, b) => new Date(b.Zeitstempel) - new Date(a.Zeitstempel));

        res.status(201).json(Veranstaltungsausgabe);

    } catch (error) {
        console.error('Fehler beim Generieren der Testveranstaltung:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

export default router;

