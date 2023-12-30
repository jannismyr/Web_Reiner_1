<template>
<h1>Veranstaltungen Übersicht</h1>

<div>
  <router-link to="/neueVeranstaltung">
    <button class="custom-button">Neue Veranstaltung</button>
  </router-link>
  <button class="custom-button">Gewählte Veranstaltung löschen</button>

    <div>
     <form class="search-form" @submit.prevent="search" >
       <input type="text" class="search-input" v-model="searchTerm" placeholder="Suche...">
    <button type="submit" class="search-button">Suche</button>
  </form>
  </div>
</div>
  
<div v-if="searchTerm.length === 0">
    <div>
      <VeranstaltungDetail v-for="Veranstaltung in AlleVeranstaltungen"
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
      <VeranstaltungDetail v-for="Veranstaltung in gefundeneVeranstaltungen"
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

import VeranstaltungDetail from '../components/VeranstaltungDetail.vue'
import axios from 'axios';

export default {
  name: 'VeranstaltungsSeite',
  components: {
    VeranstaltungDetail,
  },
  data(){
    return{
      AlleVeranstaltungen: [],
      searchTerm: '',

      
    }
  },
  methods: {
    async search() {
  if (!this.searchTerm) {
    this.gefundeneVeranstaltungen = this.AlleVeranstaltungen;
    return; // Wenn kein Suchbegriff vorhanden ist, alle Veranstaltungen anzeigen
  }

  const stichwort = this.searchTerm.toLowerCase();

  try {
    const response = await axios.get('/api/suche', {
      params: { stichwort },
    });
    this.gefundeneVeranstaltungen = response.data;
  } catch (error) {
    console.error('Fehler bei der Suche:', error.message);
  }
},

    async fetchAlleVeranstaltungen() {
      try {
        const response = await axios.get('/api/veranstaltungen');
        this.AlleVeranstaltungen = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Veranstaltungen:', error.message);
      }
    },
  },
  created() {
    this.fetchAlleVeranstaltungen();
  },
};
</script>