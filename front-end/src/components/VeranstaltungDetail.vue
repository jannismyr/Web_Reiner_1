<template>
 <div class="container">
    <div class="box">
      <div
        v-for="Veranstaltung in AlleVeranstaltungen" 
        :key="Veranstaltung.id">
          <h3>{{ Veranstaltung.veranstaltungsname }}</h3>
          <h4>{{ Veranstaltung.datum }}</h4>
          <h4>{{ Veranstaltung.ort }}</h4>
          <h4>{{ Veranstaltung.preis }}</h4>
          <h4>{{ Veranstaltung.genehmigung }}</h4>
      </div>
    </div>

  </div>
    </template>
    
    
    <script>

    import axios from 'axios';

    export default {
        name: "VeranstaltungDetail",
        data() {
            return{
              AlleVeranstaltungen: [],
            }
        },
        async created() {
         const response = await axios.get('/api/veranstaltungen');
         const AlleVeranstaltungen = response.data;
         this.AlleVeranstaltungen = AlleVeranstaltungen;
        }
    }
    </script>