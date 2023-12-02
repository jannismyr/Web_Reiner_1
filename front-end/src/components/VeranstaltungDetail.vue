<template>
 <div class="container">
    <div class="box">
      <div>
          <h3>Name: {{ Name }}</h3>
          <h4>Datum: {{new Date(Datum).toLocaleDateString() }}</h4>
          <h4>Ort: {{ Ort }}</h4>
          <h4>Preis: {{ Preis }}</h4>
          <h4>Beschreibung: {{ Beschreibung }}</h4>
          <h4>Genehmigung: {{ Genehmigung }}</h4>
      </div>
    </div>

  </div>
    </template>
    
    
    <script>

    import axios from 'axios';

    export default {
        name: "VeranstaltungDetail",
        props:{
          Name:String,
          Datum:String,
          Ort:String,
          Preis:Number,
          Beschreibung:String,
          Genehmigung:Boolean,
        },
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