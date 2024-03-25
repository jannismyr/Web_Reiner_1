<template>
  <h1>Anlegen einer neuen Veranstaltung</h1>

   <!-- Eingabefelder zum Erstellen einer Veranstaltung -->
      <form @submit.prevent="validateForm" id="eventForm">
  <label for="eventName">Veranstaltungsname:</label>
  <input type="text" id="eventName" name="eventName" v-model="this.Veranstaltung.Name"  ><br><br>

  <label for="eventDate">Datum:</label>
  <input type="date" id="eventDate" name="eventDate" v-model="this.Veranstaltung.Datum" required><br><br>

  <label for="eventLocation">Ort:</label>
  <input type="text" id="eventLocation" name="eventLocation" v-model="this.Veranstaltung.Ort"><br><br>

  <label for="eventPrice">Preis:</label>
  <input type="number" id="eventPrice" name="eventPrice" v-model="this.Veranstaltung.Preis"><br><br>

  <label for="eventDescription">Beschreibung:</label><br>
  <textarea id="eventDescription" name="eventDescription" rows="4" cols="50" v-model="this.Veranstaltung.Beschreibung"></textarea><br><br>

  <input type="submit"  value="Veranstaltung erstellen">
   </form>
  </template>


  <script>
  import axios from 'axios';
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

//Richtigkeit der Eingabe überprüfen
methods: {
  validateForm() {
    const eventName = this.Veranstaltung.Name;
    const eventLocation = this.Veranstaltung.Ort;
    const eventPrice = this.Veranstaltung.Preis;
    const eventDescription = this.Veranstaltung.Beschreibung;


    let regex1 = /^(?!\s*$)[A-Za-z0-9\s]+$/
    let regex2 = /^\d+(\.\d{1,2})?$/

    let errorMessage = null;

 
    // Switch für verschiedene Eingabefelder
    switch (true) {
        case  !regex1.test(eventName):
        alert('Ungültiger Veranstaltungsname!');
        break;

        case  !regex1.test(eventLocation):
        alert('Ungültiger Ort!');
        break;

        case  !regex2.test(eventPrice):
        alert('Ungültiger Preis!');
        break;

        case  !regex1.test(eventDescription):
        alert('Ungültige Beschreibung!');
        break;
       
      default:
        if (errorMessage) {
          alert(errorMessage);
          } else {
          const formData = {
            name: this.Veranstaltung.Name,
            datum: this.Veranstaltung.Datum,
            ort: this.Veranstaltung.Ort,
            beschreibung: this.Veranstaltung.Beschreibung,
            preis: this.Veranstaltung.Preis,
            genehmigung: false,
           };

         //senden der Daten der neuen Veranstaltung an das Backend
          axios.post('/api/veranstaltungen', formData)
            .then(response => {
              console.log('Antwort der API:', response.data);

         // Zurücksetzen der Eingabefelder nach erfolgreichem Absenden des Formulars
          this.Veranstaltung.Name = '';
          this.Veranstaltung.Datum = '';
          this.Veranstaltung.Ort = '';
          this.Veranstaltung.Preis = '';
          this.Veranstaltung.Beschreibung = '';

          alert('Veranstaltung erfolgreich erstellt!');
            })
            
            .catch(error => {
              console.error('Fehler bei der Anfrage:', error);
            });
          break;
        }
     }
    },
  },
};

  </script>