<template>
  
  <!-- Eingabefelder zum Bearbeiten einer Veranstaltung -->
  <div>
    <h1>Veranstaltung Bearbeiten</h1>
    <form @submit.prevent="updateVeranstaltung" id="eventForm">
      <div>
        <label for="name">Name:</label>
        <input id="eventName" v-model="veranstaltung.name" type="text" />
      </div>
      <div>
        <label for="datum">Datum:</label>
        <input id="eventDate" v-model="veranstaltung.datum" type="date" />
      </div>
      <div>
        <label for="ort">Ort:</label>
        <input id="eventLocation" v-model="veranstaltung.ort" type="text" />
      </div>
      <div>
        <label for="preis">Preis:</label>
        <input id="eventPrice" v-model="veranstaltung.preis" type="number" />
      </div>
      <div>
        <label for="beschreibung">Beschreibung:</label>
        <textarea id="eventDescription" rows="4" cols="50" v-model="veranstaltung.beschreibung"></textarea>
      </div>
      <div>
        <button class="save-button" type="submit">Änderungen Speichern</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "BearbeitenKomponente",
  data() {
    return {
      veranstaltung: {
        name: '',
        datum: '',
        ort: '',
        preis: null,
        beschreibung: '',
        id: this.$route.params.Id // ID aus dem Router-Parameter
      },
    };
  },
  created() {
    this.ladeVeranstaltung();
  },

  methods: {
    async ladeVeranstaltung() {
      try {
        const response = await axios.get('/api/veranstaltungen/' + this.veranstaltung.id);
        let veranstaltungDaten = response.data;

        // Konvertieren des Datums in das richtige Format, falls nötig
        if (veranstaltungDaten.datum) {
          veranstaltungDaten.datum = this.formatDate(veranstaltungDaten.datum);
        }

        this.veranstaltung = veranstaltungDaten;
      } catch (error) {
        console.error('Fehler beim Laden der Veranstaltung:', error);
        alert('Fehler beim Laden der Veranstaltung.');
      }
    },

    formatDate(dateString) {
      const dotParts = dateString.split('.');
      const dashParts = dateString.split('-');

      if (dotParts.length === 3) {
        // DD.MM.YYYY Format
        const [day, month, year] = dotParts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      } else if (dashParts.length === 3) {
        // YYYY-MM-DD Format, bereits korrekt, keine Umwandlung nötig
        return dateString;
      } else {
        return null; // Ungültiges Datum
      }
    },

    formatDateToDDMMYYYY(dateString) {
      const dashParts = dateString.split('-');

      if (dashParts.length === 3) {
        // YYYY-MM-DD Format
        const [year, month, day] = dashParts;
        return `${parseInt(day)}.${parseInt(month)}.${year}`;
      } else {
        // DD.MM.YYYY Format, oder ungültiges Format
        return dateString; // Keine Umwandlung nötig, oder nicht umwandelbar
      }
    },

    async updateVeranstaltung() {
      try {
        const updateData = { ...this.veranstaltung };
        delete updateData.id;
        // Angenommen, Zeitstempel existiert und soll entfernt werden
        // delete updateData.Zeitstempel;

        if (updateData.datum) {
          // Umwandeln in DD.MM.YYYY ohne führende Nullen für das Backend
          updateData.datum = this.formatDateToDDMMYYYY(updateData.datum);
        }

        await axios.put('/api/veranstaltungen/' + this.veranstaltung.id, updateData);
        alert('Veranstaltung erfolgreich aktualisiert!');
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Veranstaltung:', error);
        alert('Fehler beim Aktualisieren der Veranstaltung.');
      }
    },
  },
};
</script>
