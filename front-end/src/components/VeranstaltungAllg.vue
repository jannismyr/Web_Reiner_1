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
      <button @click="deleteVeranstaltung">Veranstaltung Löschen</button>
      <p></p>
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
        name: "VeranstaltungAllg",
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
         const response = await axios.get('/api/veranstaltungen');
         const AlleVeranstaltungen = response.data;
         this.AlleVeranstaltungen = AlleVeranstaltungen;
        },
        methods: {
    async deleteVeranstaltung() {
      try {
        // `veranstaltungId` wird als Prop übergeben
        await axios.delete(`/api/veranstaltungen/${this.veranstaltungId}`);
        
        // Aktualisiere die Liste der Veranstaltungen nach dem Löschen
        const response = await axios.get('/api/veranstaltungen');
        this.$emit('veranstaltungDeleted', response.data); // Event auslösen, um die Liste in der Elternkomponente zu aktualisieren
      } catch (error) {
        console.error("Fehler beim Löschen der Veranstaltung", error);
      }
    }
  }
};
</script>