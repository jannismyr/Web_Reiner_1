<template>
<h1>Veranstaltungen Übersicht</h1>

<div>
  <router-link to="/neueVeranstaltung">
    <button class="custom-button">Neue Veranstaltung</button>
  </router-link>
  <button class="custom-button">Gewählte Veranstaltung löschen</button>

    <div>
      <form class="search-form">
    <input type="text" class="search-input" placeholder="Suche...">
    <button type="submit" class="search-button">Suche</button>
  </form>
  </div>
</div>
  
<div>
  <VeranstaltungDetail v-for="Veranstaltung in AlleVeranstaltungen"
  :key="Veranstaltung.id"
  :Name="Veranstaltung.name"
  :Datum="Veranstaltung.datum"
  :Ort="Veranstaltung.ort"
  :Preis="Veranstaltung.preis"
  :Beschreibung="Veranstaltung.beschreibung"
  :Genehmigung="Veranstaltung.genehmigung"
  />
<br>
</div>
</template>

<script>

import VeranstaltungDetail from '../components/VeranstaltungDetail.vue'

import axios from 'axios';

export default {
  name: 'VeranstaltungsSeite',
  components: {
    VeranstaltungDetail,
  },
  data(){
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