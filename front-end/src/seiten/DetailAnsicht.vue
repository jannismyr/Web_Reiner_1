<template>
  <div>
    <h1>DetailSeite zu einer Veranstaltung</h1>

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

    <!-- Button zum Genehmigen der Veranstaltung -->
    <button
      class="genehmigen-button"
      @click="genehmigeVeranstaltung(selectedVeranstaltung.id)"
      v-if="selectedVeranstaltung && !selectedVeranstaltung.genehmigung"
    >
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
  </div>
</template>

<script>
import VeranstaltungSpezif from '../components/VeranstaltungSpezif.vue';
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
      const selectedId = this.$route.params.Id;
      const response = await axios.get('/api/veranstaltungen/' + selectedId);
     if (response.data && response.status === 200) {
      this.selectedVeranstaltung = response.data;
    } else {
      // Umleiten auf eine 404-Seite, wenn die Veranstaltung nicht gefunden wird
      this.$router.push('/404');
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der spezifischen Veranstaltung:', error);
    // Umleiten auf eine 404-Seite im Fehlerfall
    this.$router.push('/404');
  } 


  },
  async mounted() {
    try {
      const veranstaltungId = this.$route.params.Id;
      const response = await axios.get(`/api/veranstaltungen/${veranstaltungId}`);
      this.selectedVeranstaltung = response.data;

      const highlightsResponse = await axios.get(`/api/veranstaltungen/${veranstaltungId}/highlights`);
      this.selectedVeranstaltung.highlights = highlightsResponse.data;

   /*   // Wiederholen Sie die gleiche Überprüfung hier
    if (response.data && response.status === 200) {
      this.selectedVeranstaltung = response.data;
    } else {
      // Umleiten auf eine 404-Seite, wenn die Veranstaltung nicht gefunden wird
      this.$router.push('/404');
    }*/

    } catch (error) {
      console.error('Fehler beim Abrufen der Veranstaltungsdetails und Highlights:', error);
    }
  },
  methods: {
    async genehmigeVeranstaltung(veranstaltungId) {
      try {
        await axios.put(`/api/veranstaltungen/genehmigen/${veranstaltungId}`);
        if (this.selectedVeranstaltung && this.selectedVeranstaltung.id === veranstaltungId) {
          this.selectedVeranstaltung.genehmigung = true;
          this.selectedVeranstaltung.Zeitstempel = new Date().toISOString();
        }
      } catch (error) {
        console.error('Fehler beim Genehmigen der Veranstaltung:', error);
      }
    },

    //Link in Zwischenablage kopieren (Teilen Funktion)
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
      axios.post(`/api/veranstaltungen/${this.newHighlight.veranstaltungId}/highlights`, {
        highlights: [
          {
            überschrift: this.newHighlight.title,
            beschreibung: this.newHighlight.description,
          },
        ],
      }).then(response => {
        console.log("Highlight hinzugefügt", response);
        this.newHighlight.title = '';
        this.newHighlight.description = '';
        this.reloadVeranstaltungData();
      }).catch(error => {
        console.error("Fehler beim Hinzufügen des Highlights", error);
      });
    },
  

  async reloadVeranstaltungData() {
      try {
        const veranstaltungId = this.$route.params.Id;
        const response = await axios.get(`/api/veranstaltungen/${veranstaltungId}`);
        this.selectedVeranstaltung = response.data;

        // Lade die Highlights neu
        const highlightsResponse = await axios.get(`/api/veranstaltungen/${veranstaltungId}/highlights`);
        this.selectedVeranstaltung.highlights = [...highlightsResponse.data];
    console.log("Veranstaltungsdaten wurden neu geladen!"); // Konsolenausgabe zur Überprüfung
  } catch (error) {
    console.error('Fehler beim erneuten Laden der Veranstaltungsdaten:', error);
  }
},
  }
};
</script>
