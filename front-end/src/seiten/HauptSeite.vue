<template>
<h1>Veranstaltungen Übersicht</h1>

<div>
  <router-link to="/neueVeranstaltung">
    <button class="custom-button">Neue Veranstaltung</button>
  </router-link>

  
  <button class="custom-button" @click="generateTestData">Testdaten generieren</button>

  <!-- Suchfeld -->
    <div>
     <form class="search-form" @submit.prevent="search" >
       <input type="text" class="search-input" v-model="searchTerm" placeholder="Suche..." @keyup="search">
    <button type="submit" class="search-button">Suche</button>
  </form>
  </div>
</div>
  
<!-- Anzeige der Veranstaltungen -->
    <div class="Veranstaltungsliste">
      <VeranstaltungAllg v-for="Veranstaltung in AlleVeranstaltungen"
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

  
</template>

<script>
  import VeranstaltungAllg from '../components/VeranstaltungAllg.vue'

import axios from 'axios';

export default {
  name: 'HauptSeite',
  components: {
    VeranstaltungAllg,
  },
  data(){
    return{
      AlleVeranstaltungen: [],
      gefundeneVeranstaltungen: [],
      searchTerm: '',
      isLoading: false,
      error: null,
    }
  },

  // Methode für die Suche
  methods: {
    async search() {
      try {
          if (!this.searchTerm) {
            const response = await axios.get('/api/veranstaltungen/genehmigt');
            this.AlleVeranstaltungen = response.data;
          } else {
            const stichwort = this.searchTerm.toLowerCase();
            const response = await axios.get(`/api/suche/${"genehmigt"}`, {
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

    // alle genehmigten Veranstaltungen werden vom Backend geladen
    async fetchAlleVeranstaltungen() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/veranstaltungen/genehmigt');
        this.AlleVeranstaltungen = response.data;
        this.gefundeneVeranstaltungen = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Veranstaltungen:', error.message);
        this.error = 'Fehler beim Laden der Veranstaltungen.';
      } finally {
        this.isLoading = false;
      }
    },

    //Testdaten generieren
    async generateTestData() {
  try {
    // Senden einer HTTP-Anfrage an den Express-Server
    const response = await axios.get('/api/testdatengenerator');
    console.log("Testdaten erfolgreich generiert: ", response.data);

    // Alert-Benachrichtigung hinzufügen
    alert("Nicht-genehmigte Testveranstaltung wurde erfolgreich generiert!");

    // Nach erfolgreichem Abrufen der Testdaten, aktualisieren Sie die Veranstaltungsliste
    await this.fetchAlleVeranstaltungen();
    } catch (error) {
      console.error("Fehler beim Generieren der Testdaten: ", error);
    }
   }
  },

  created() {
    this.fetchAlleVeranstaltungen();
  },
};
</script>