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
   <button class="custom-button" @click="copyLinkToClipboard">Link teilen</button>

     <!-- Formular für das Hinzufügen von Highlights -->
     <div class="highlight-form">
      <h3>Highlight hinzufügen</h3>
      <input type="text" v-model="newHighlight.title" placeholder="Überschrift" class="highlight-form input[type='text']">
      <textarea v-model="newHighlight.description" placeholder="Beschreibung" maxlength="1024" class="highlight-form textarea"></textarea>
      <button @click="addHighlight" class="highlight-form button">Hinzufügen</button>
    </div>

    <!-- Anzeige der Highlights -->
    <ul class="highlight-list" v-if="selectedVeranstaltung.highlights">
      <h3>Highlights</h3>
      <li v-for="highlight in selectedVeranstaltung.highlights" :key="highlight.id">
        <h4>{{ highlight.title }}</h4>
        <p>{{ highlight.description }}</p>
      </li>
    </ul>
    
    
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
        description: ''
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
    copyLinkToClipboard() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("Link wurde in die Zwischenablage kopiert!");
      }).catch(err => {
        console.error('Fehler beim Kopieren des Links:', err);
      });
    },
    addHighlight() {
      // Logik zum Hinzufügen des Highlights zur Veranstaltung
      // ...
    },
  }
  };
  </script>
  