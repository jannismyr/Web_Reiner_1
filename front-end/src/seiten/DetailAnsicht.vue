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

    <button 
      class="genehmigen-button" 
      @click="genehmigeVeranstaltung($route.params.Id)"
      v-if="selectedVeranstaltung && !selectedVeranstaltung.genehmigung">
      Veranstaltung genehmigen
    </button> 
   

    
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
    // Extrahiere die ID aus den Route-Parametern
    const selectedId = this.$route.params.Id;

    // Direkter Abruf der spezifischen Veranstaltung anhand ihrer ID
    const response = await axios.get('/api/veranstaltungen/' + selectedId);
    this.selectedVeranstaltung = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der spezifischen Veranstaltung:', error);
  }
},
  };
  </script>
  