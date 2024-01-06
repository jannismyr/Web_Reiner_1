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
    props: {
      Name: String,
      Datum: String,
      Ort: String,
      Preis: Number,
      Beschreibung: String,
      veranstaltungId: String,
    },
    data() {
      return {
        veranstaltung: {
          name: this.Name,
          datum: this.Datum,
          ort: this.Ort,
          preis: this.Preis,
          beschreibung: this.Beschreibung,
          id: this.veranstaltungId,
        },
      };
    },
    methods: {
      async updateVeranstaltung() {
        try {
          await axios.put('/api/veranstaltungen/' + this.veranstaltung.id, this.veranstaltung);
          alert('Veranstaltung erfolgreich aktualisiert!');
        } catch (error) {
          console.error('Fehler beim Aktualisieren der Veranstaltung:', error);
          alert('Fehler beim Aktualisieren der Veranstaltung.');
        }
      },
    },
  };
  </script>
  