<template>
    <div>
      <h1>NICHT GENEHMIGT</h1>

      <div class="Veranstaltungsliste">
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

      <!-- Button zum Teilen der Liste aller Nicht-genehmigten Veranstaltungen -->
   <button class="custom-button" @click="copyLinkToClipboard">Liste teilen</button>

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


  methods: {
    copyLinkToClipboard() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("Link wurde in die Zwischenablage kopiert!");
      }).catch(err => {
        console.error('Fehler beim Kopieren des Links:', err);
      });
    }
  }
}
</script>