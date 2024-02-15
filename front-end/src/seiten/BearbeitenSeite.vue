<template>
    <div>

  <!-- Zeigt die Komponente nur an, wenn `selectedVeranstaltung` existiert -->
      <BearbeitenKomponente
        v-if="selectedVeranstaltung" 
        :selectedVeranstaltung="selectedVeranstaltung"
        @updateVeranstaltung="handleUpdate"
      />
    </div>
</template>

<script>
import BearbeitenKomponente from '../components/BearbeitenKomponente.vue'
import axios from 'axios';

export default {
  name: 'BearbeitenSeite',
  components: {
    BearbeitenKomponente,
  },
  data() {
    return {
      AlleVeranstaltungen: [],
      selectedVeranstaltung: null,
      Id: this.$route.params.Id,
    };
  },
  async created() {
    // Lädt alle Veranstaltungen aus dem Backend
    try {
      const response = await axios.get('/api/veranstaltungen');
      this.AlleVeranstaltungen = response.data;

      //Wählt die Veranstaltung anhand der ID aus
      const selectedId = this.Id;
      this.selectedVeranstaltung = this.AlleVeranstaltungen.find(
        (veranstaltung) => veranstaltung.id === selectedId
      );
    } catch (error) {
      console.error('Fehler beim Abrufen der Veranstaltungen:', error);
    }
  },
  methods: {
    
    //Veranstaltung mit neuen Daten aktualisieren
    async handleUpdate(updatedVeranstaltung) {
      try {
        await axios.put(`/api/veranstaltungen/${this.selectedVeranstaltung.id}`, updatedVeranstaltung);
        this.selectedVeranstaltung = updatedVeranstaltung;
        alert('Veranstaltung erfolgreich aktualisiert!');
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Veranstaltung:', error);
        alert('Fehler beim Aktualisieren der Veranstaltung');
      }
    },
  }
};
</script>
