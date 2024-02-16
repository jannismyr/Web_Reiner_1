<template>
    <div>
      <h1>DetailSeite zu einer Veranstaltung</h1>

<h2>ID QUICK-CHECK:  {{ $route.params.Id }}</h2>


      <VeranstaltungSpezif
        v-if="selectedVeranstaltung"
        :Name="selectedVeranstaltung.name"
        :Datum="selectedVeranstaltung.datum"
        :Ort="selectedVeranstaltung.ort"
        :Preis="selectedVeranstaltung.preis"
        :Beschreibung="selectedVeranstaltung.beschreibung"
        :Genehmigung="selectedVeranstaltung.genehmigung"
        :veranstaltungId="selectedVeranstaltung.id"
        :highlights="selectedVeranstaltung.highlights"

        
      />
    </div>

    <!-- Button zum Genehmigen der Veranstaltung -->
    <button
      class="genehmigen-button"
      @click="genehmigeVeranstaltung(selectedVeranstaltung.id)"
      v-if="selectedVeranstaltung && !selectedVeranstaltung.genehmigung">
      Veranstaltung genehmigen
    </button>
   <p></p>

    <!-- Button zum Teilen der Veranstaltung -->
   <button class="custom-button" @click="copyLinkToClipboard">Link teilen</button>

     <!-- Formular für das Hinzufügen von Highlights -->
     <div class="highlight-form">
      <h3>Highlight hinzufügen</h3>
      <input type="text" v-model="newHighlight.title" placeholder="Überschrift" class="highlight-form input[type='text']">
      <textarea v-model="newHighlight.description" placeholder="Beschreibung" maxlength="1024" class="highlight-form textarea"></textarea>
      <button @click="addHighlight" class="highlight-form button">Hinzufügen</button>
    </div>


  </template>
  <script>
  import VeranstaltungSpezif from '../components/VeranstaltungSpezif.vue'
  import axios from 'axios';
  
  export default {
    name: 'DetailAnsicht',
    components: {
      VeranstaltungSpezif,
    },
    data() {
      return {
        AlleVeranstaltungen: [],
        selectedVeranstaltung: null,
        Id: this.$route.params.Id,
        newHighlight: {
        title: '',
        description: '',
        veranstaltungId: this.$route.params.Id,
      },
      };
    },
    async created() {
  try {
    // Extrahiere die ID aus den Route-Parametern
    const selectedId = this.$route.params.Id;

    // Direkter Abruf der spezifischen Veranstaltung anhand ihrer ID
    const response = await axios.get('/api/veranstaltungen/' + selectedId);
    this.selectedVeranstaltung = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der spezifischen Veranstaltung:', error);
  }
},
methods: {
    async genehmigeVeranstaltung(veranstaltungId) {
      try {
        // Senden eines PUT-Requests an die API zum Genehmigen der Veranstaltung
        await axios.put(`/api/veranstaltungen/genehmigen/${veranstaltungId}`);

        // Aktualisieren der lokal gespeicherten Veranstaltung
        if (this.selectedVeranstaltung && this.selectedVeranstaltung.id === veranstaltungId) {
          this.selectedVeranstaltung.genehmigung = true;
          this.selectedVeranstaltung.Zeitstempel = new Date().toISOString();
        }
      } catch (error) {
        console.error('Fehler beim Genehmigen der Veranstaltung:', error);
      }
    },

    async mounted() {
    const veranstaltungId = this.$route.params.Id;  // Holt die ID aus den Route-Parametern
    try {
      // Lädt die Veranstaltungsdetails
      const response = await axios.get(`/api/veranstaltungen/${veranstaltungId}`);
      this.selectedVeranstaltung = response.data;

      // Lädt die Highlights für die Veranstaltung
      const highlightsResponse = await axios.get(`/api/veranstaltungen/${veranstaltungId}/highlights`);
      this.highlights = highlightsResponse.data;  // Speichert die Highlights in der Datenvariable
    } catch (error) {
      console.error('Fehler beim Abrufen der Veranstaltungsdetails und Highlights:', error);
    }
  },
    
    //Speichern des Links in die Zwischenablage
    copyLinkToClipboard() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("Link wurde in die Zwischenablage kopiert!");
      }).catch(err => {
        console.error('Fehler beim Kopieren des Links:', err);
      });
    },

    addHighlight() {
  if (!this.newHighlight.title || !this.newHighlight.description) {
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }

  // Korrektur der Feldnamen gemäß Backend-Erwartungen
  axios.post(`/api/veranstaltungen/${this.newHighlight.veranstaltungId}/highlights`, {
    highlights: [
      {
        überschrift: this.newHighlight.title,  // Geändert von 'title' zu 'überschrift'
        beschreibung: this.newHighlight.description  // Geändert von 'description' zu 'beschreibung'
      }
    ]
  })
  .then(response => {
    console.log("Highlight hinzugefügt", response);
    this.newHighlight.title = '';
    this.newHighlight.description = '';
  })
  .catch(error => {
    console.error("Fehler beim Hinzufügen des Highlights", error);
  });
    } 
  }
  };
  </script>
  