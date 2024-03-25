<template>
    <div>
      <h1>NICHT GENEHMIGT</h1>

      <!-- Suchfeld -->
      <div>
          <form class="search-form" @submit.prevent="search" >
            <input type="text" class="search-input" v-model="searchTerm" placeholder="Suche..." @keyup="search">
          <button type="submit" class="search-button">Suche</button>
        </form>
        </div>
      

      <div class="Veranstaltungsliste">
      <NichtGenehmigtKomponente v-for="Veranstaltung in AlleVeranstaltungen"
        :key="Veranstaltung.id"
        :Name="Veranstaltung.name"
        :Datum="Veranstaltung.datum"
        :Ort="Veranstaltung.ort"
        :Preis="Veranstaltung.preis"
        :Beschreibung="Veranstaltung.beschreibung"
        :Genehmigung="Veranstaltung.genehmigung"
        :veranstaltungId="Veranstaltung.id"
      />
      <br>
    </div>
    </div>

      <!-- Button zum Teilen der Liste aller Nicht-genehmigten Veranstaltungen -->
   <button class="custom-button" @click="copyLinkToClipboard">Liste teilen</button>

  </template>
  
  <script>
  import NichtGenehmigtKomponente from '../components/NichtGenehmigtKomponente.vue'
  import axios from 'axios';
  
  export default {
    name: 'NichtGenehmigtSeite',
    components: {
        NichtGenehmigtKomponente,
    },
    data() {
      return {
        AlleVeranstaltungen: [],
        selectedVeranstaltung: null,
        Id: this.$route.params.Id,
      };
    },

    //Laden der nicht genehmigten Veranstaltungen vom Backend
    async created() {
        const response = await axios.get('/api/veranstaltungen/nicht-genehmigt');
         const AlleVeranstaltungen = response.data;
         this.AlleVeranstaltungen = AlleVeranstaltungen;
        },

  methods: {
    copyLinkToClipboard() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("Link wurde in die Zwischenablage kopiert!");
      }).catch(err => {
        console.error('Fehler beim Kopieren des Links:', err);
      });
    },

 // Methode für die Suche
    async search() {
      try {
          if (!this.searchTerm) {
            const response = await axios.get('/api/veranstaltungen/nicht-genehmigt');
            this.AlleVeranstaltungen = response.data;
          } else {
            const stichwort = this.searchTerm.toLowerCase();
            const response = await axios.get(`/api/suche/${"nicht-genehmigt"}`, {
              params: { stichwort },
            });
            // Überprüfen, ob eine Antwort vorhanden ist
            if (response.data && response.data.length > 0) {
              this.AlleVeranstaltungen = response.data;
            } else {
              // Setze AlleVeranstaltungen auf ein leeres Array und zeige eine Meldung an
              this.AlleVeranstaltungen = [];
              this.error = 'Keine Veranstaltungen gefunden.';
            }
          }
        } catch (error) {
          console.error('Fehler bei der Suche:', error.message);
          this.error = 'Fehler bei der Kommunikation mit dem Server.';
        }

        this.isLoading = false;
      },

  
    },
  };
</script>