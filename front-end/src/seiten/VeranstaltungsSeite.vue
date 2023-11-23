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
  <VeranstaltungDetail/>
<br>
</div>

</template>

<script>

import VeranstaltungDetail from '../components/VeranstaltungDetail.vue'


export default {
  name: 'VeranstaltungsSeite',
  components: {
    VeranstaltungDetail,
  }
}



</script>