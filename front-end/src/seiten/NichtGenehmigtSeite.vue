<template>
    <div>
      <h1>NICHT GENEHMIGT</h1>

      <div>
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
    };
  
  </script>
  