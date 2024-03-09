import express from 'express';
import { AlleVeranstaltungen } from './temp-data.js';
import NeueVeranstaltungsId from './IDGenerator.js';

const router = express.Router();

router.post('/api/import/veranstaltung', (req, res) => {
  try {
    const importData = req.body;

    // Sehen die Daten gut aus?
    if (!importData || !importData.entry || !importData.entry.title || !importData.entry.date) {
      return res.status(400).json({ error: 'Ungültiges Importdatenformat' });
    }

    // Import
    const neueVeranstaltung = {
      id: NeueVeranstaltungsId(AlleVeranstaltungen).toString(),
      name: importData.entry.title,
      datum: importData.entry.date,
      ort: importData.entry.location || '',
      preis: importData.entry.price ? importData.entry.price.toString() : '',
      beschreibung: importData.entry.beschreibung || '',
      genehmigung: false,
      Zeitstempel: new Date(importData.createdOn * 1000).toISOString(),
    };

    AlleVeranstaltungen.push(neueVeranstaltung);

    res.status(201).json({ message: 'Veranstaltung erfolgreich importiert', veranstaltung: neueVeranstaltung });
  } catch (error) {
    console.error('Fehler beim Importieren der Veranstaltung:', error);
    res.status(500).json({ error: 'Interner Serverfehler beim Importieren der Veranstaltung' });
  }
});

export default router;
