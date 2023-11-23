<template>
  <h1>Anlegen einer neuen Veranstaltung</h1>

  <div>
      <form @submit.prevent="validateForm" id="eventForm">
  <label for="eventName">Veranstaltungsname:</label>
  <input type="text" id="eventName" name="eventName" v-model="this.Veranstaltung.Name"  ><br><br>

  <label for="eventDate">Datum:</label>
  <input type="date" id="eventDate" name="eventDate" v-model="this.Veranstaltung.Datum"><br><br>

  <label for="eventLocation">Ort:</label>
  <input type="text" id="eventLocation" name="eventLocation" v-model="this.Veranstaltung.Ort"><br><br>

  <label for="eventPrice">Preis:</label>
  <input type="number" id="eventPrice" name="eventPrice" v-model="this.Veranstaltung.Preis"><br><br>

  <label for="eventDescription">Beschreibung:</label><br>
  <textarea id="eventDescription" name="eventDescription" rows="4" cols="50" v-model="this.Veranstaltung.Beschreibung"></textarea><br><br>

  <input type="submit"  value="Veranstaltung erstellen">
   </form>
  </div>
  </template>


  <script>
export default {
name: 'NeueVeranstaltung',
data () {
  return {
      Veranstaltung: {
          Name: '',
          Datum: '',
          Ort: '',
          Preis: '',
          Beschreibung: '',
      }
  }
},
components: {
},

methods: {
  validateForm() {
    const eventName = this.Veranstaltung.Name;
    const eventLocation = this.Veranstaltung.Ort;

    // Switch für verschiedene Eingabefelder
    switch (true) {
      case !eventName.match(/^(?!\s*$)[A-Za-z0-9\s]+$/):
        alert('Ungültiger Veranstaltungsname!');
        break;

      case !eventLocation.match(/^(?!\s*$)[A-Za-z0-9\s]+$/):
        alert('Ungültiger Ort!');
        break;

      default:
        console.log('Formular ist gültig!');
        break;
    }
  },
},
};

  </script>