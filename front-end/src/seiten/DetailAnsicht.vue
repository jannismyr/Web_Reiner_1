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
      };
    },
    async created() {
      try {
        const response = await axios.get('/api/veranstaltungen');
        this.AlleVeranstaltungen = response.data;
  
         const selectedId =  this.Id;
        this.selectedVeranstaltung = this.AlleVeranstaltungen.find(
          (veranstaltung) => veranstaltung.id === selectedId
        );
      } catch (error) {
        console.error('Fehler beim Abrufen der Veranstaltungen:', error);
      }
    },
  };
  </script>
  