<template>
<h1>Veranstaltungen Übersicht</h1>

<div>
  <router-link to="/neueVeranstaltung">
    <button class="custom-button">Neue Veranstaltung</button>
  </router-link>

    <div>
     <form class="search-form" @submit.prevent="search" >
       <input type="text" class="search-input" v-model="searchTerm" placeholder="Suche...">
    <button type="submit" class="search-button">Suche</button>
  </form>
  </div>
</div>
  
<div v-if="searchTerm.length === 0">
    <div>
      <VeranstaltungAllg v-for="Veranstaltung in AlleVeranstaltungen"
        :key="Veranstaltung.id"
        :Name="Veranstaltung.name"
        :Datum="Veranstaltung.datum"
        :Ort="Veranstaltung.ort"
        :Preis="Veranstaltung.preis"
        :Beschreibung="Veranstaltung.beschreibung"
        :Genehmigung="Veranstaltung.genehmigung"
        :veranstaltungId="Veranstaltung.id"
        @veranstaltungDeleted="AlleVeranstaltungen = $event"
      />
      <br>
    </div>
  </div>

  <div v-else>
    <div v-if="searchTerm.length > 0">
      <VeranstaltungAllg v-for="Veranstaltung in gefundeneVeranstaltungen"
        :key="Veranstaltung.id"
        :Name="Veranstaltung.name"
        :Datum="Veranstaltung.datum"
        :Ort="Veranstaltung.ort"
        :Preis="Veranstaltung.preis"
        :Beschreibung="Veranstaltung.beschreibung"
        :Genehmigung="Veranstaltung.genehmigung"
        :veranstaltungId="Veranstaltung.id"
        @veranstaltungDeleted="AlleVeranstaltungen = $event"
      />
      <br>
    </div>
    <div v-else>
      <p>Keine Veranstaltung gefunden.</p>
    </div>
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
  methods: {
    async search() {
      this.isLoading = true;
      this.error = null;

      if (!this.searchTerm) {
        this.gefundeneVeranstaltungen = this.AlleVeranstaltungen;
        this.isLoading = false;
        return;
      }

      const stichwort = this.searchTerm.toLowerCase();

      try {
        const response = await axios.get('/api/suche', {
          params: { stichwort },
        });
        if (response.data.error) {
          this.error = response.data.error;
        } else if (response.data.message) {
          this.gefundeneVeranstaltungen = [];
          this.error = response.data.message;
        } else {
          this.gefundeneVeranstaltungen = response.data;
        }
      } catch (error) {
        console.error('Fehler bei der Suche:', error.message);
        this.error = 'Fehler bei der Kommunikation mit dem Server.';
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAlleVeranstaltungen() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/veranstaltungen');
        this.AlleVeranstaltungen = response.data;
        this.gefundeneVeranstaltungen = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Veranstaltungen:', error.message);
        this.error = 'Fehler beim Laden der Veranstaltungen.';
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchAlleVeranstaltungen();
  },
};
</script>