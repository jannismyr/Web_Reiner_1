<template>
    <div class="container">
       <div class="box">
         <div>
             <h3>Name: {{ Name }}</h3>
             <h4>Datum: {{ formatDatum(Datum) }}</h4>
             <h4>Ort: {{ Ort }}</h4>
             <h4>Preis: {{ Preis }}</h4>
             <h4>Beschreibung: {{ Beschreibung }}</h4>
             <h4>Genehmigung: {{ Genehmigung }}</h4>
        
             <router-link :to="`/detailAnsicht/${veranstaltungId}`">
              <button>Veranstaltung näher anzeigen</button>
            </router-link>

         <p>Veranstaltung ID: {{ veranstaltungId }}</p>
         </div>
       </div>

      
     </div>
       </template>
       
       
       <script>
   
       import axios from 'axios';
   
       export default {
           name: "NichtGenehmigtKomponente",
           props:{
             Name:String,
             Datum:String,
             Ort:String,
             Preis:Number,
             Beschreibung:String,
             Genehmigung:Boolean,
             veranstaltungId:String,
           },
           data() {
               return{
                 AlleVeranstaltungen: [],
               }
           },
           async created() {
            const response = await axios.get('/api/veranstaltungen/nicht-genehmigt');
            const AlleVeranstaltungen = response.data;
            this.AlleVeranstaltungen = AlleVeranstaltungen;
           },
           methods: {
            formatDatum(datumString) {
              const teile = datumString.split('.');
              // Stellen Sie sicher, dass das Datum im Format DD-MM-YYYY vorliegt
              if (teile.length === 3) {
                const umgeformtesDatum = `${teile[2]}-${teile[1]}-${teile[0]}`;
                return new Date(umgeformtesDatum).toLocaleDateString();
              }
              return 'Ungültiges Datum';
            }
          }
    
   };
   </script>