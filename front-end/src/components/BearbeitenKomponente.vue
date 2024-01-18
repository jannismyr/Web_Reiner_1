<template>
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
          <button type="submit">Änderungen Speichern</button>
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

      // Konvertieren Sie das Datum in das richtige Format, falls nötig
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
    const date = new Date(dateString);
    let formattedDate = date.getFullYear() + '-' + 
                        ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
                        ('0' + date.getDate()).slice(-2);
    return formattedDate;
  },
    async updateVeranstaltung() {
      try {
        // Entfernen von id und Zeitstempel aus den zu sendenden Daten
        const updateData = { ...this.veranstaltung };
        delete updateData.id;
        delete updateData.Zeitstempel;
        
        // Senden der aktualisierten Daten an den Server
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