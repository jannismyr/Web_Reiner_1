<template>
    <div class="container">
       <div class="box">
         <!-- Anzeige der Detailseite der Veranstaltung -->
         <div>
             <h3>Name: {{ Name }}</h3>
             <h4>Datum: {{ formatDatum(Datum)}}</h4>
             <h4>Ort: {{ Ort }}</h4>
             <h4>Preis: {{ Preis }}</h4>
             <h4>Beschreibung: {{ Beschreibung }}</h4>
             <h4>Genehmigung: {{ Genehmigung }}</h4>

               <!-- HIGHLIGHTS-->
               <div v-if="highlights && highlights.length">
              <h4>Highlights:</h4>
              <ul class="highlights-list">
                <li v-for="(highlight, index) in highlights" :key="index" class="highlight-item">
                  <strong>{{ highlight.überschrift }}</strong>: {{ highlight.beschreibung }}
                </li>
              </ul>
            </div>
            <div v-else>
              <h4>Highlights: Keine</h4>
            </div>
             
             <router-link :to="`/bearbeiten/${veranstaltungId}`">
              <button>Veranstaltung bearbeiten</button>
            </router-link>
        
         <p>Veranstaltung ID: {{ veranstaltungId }}</p>

         </div>
         
       </div>
   
     </div>
       </template> 
       <script>
   
       import axios from 'axios';
   
       export default {
           name: "VeranstaltungSpezif",
           props:{
             Name:String,
             Datum:String,
             Ort:String,
             Preis:String,
             Beschreibung:String,
             Genehmigung:Boolean,
             veranstaltungId:String,
             highlights: Array,
           },
           data() {
               return{
                 AlleVeranstaltungen: [],
               }
           },
           
           //Alle genehmigten Veranstaltungen werden vom Backend geladen
           async created() {
            const response = await axios.get('/api/veranstaltungen');
            const AlleVeranstaltungen = response.data;
            this.AlleVeranstaltungen = AlleVeranstaltungen;
           },
           
           methods: {
            formatDatum(datumString) {
        // Überprüfung, ob das Datum im Format YYYY-MM-DD vorliegt
        const matchYYYYMMDD = datumString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (matchYYYYMMDD) {
          return `${matchYYYYMMDD[3]}.${matchYYYYMMDD[2]}.${matchYYYYMMDD[1]}`;
        }

        // Überprüfung, ob das Datum im Format DD-MM-YYYY vorliegt
        const matchDDMMYYYY = datumString.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
        if (matchDDMMYYYY) {
          // Verwenden Sie toLocaleDateString, um das Datum im lokalen Format anzuzeigen
          const umgeformtesDatum = new Date(`${matchDDMMYYYY[3]}-${matchDDMMYYYY[2]}-${matchDDMMYYYY[1]}`);
          return umgeformtesDatum.toLocaleDateString();
        }

        return 'Ungültiges Datum';
      },
      mounted() {
    console.log("Empfangene Highlights:", this.Highlights);
  }
          }
   };
   </script>