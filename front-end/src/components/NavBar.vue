<template>
  <nav>
    <ul>
        <router-link to="/hauptseite">
            <li><a href="#">Startseite</a></li>
        </router-link>

        <router-link to="/neueVeranstaltung">
            <li><a href="#">Neue Veranstaltung</a></li>
        </router-link>

        <router-link to="/nicht-genehmigt">
            <li><a href="#">Nicht-genehmigt</a></li>
        </router-link>
       
    </ul>
</nav>
</template>


<script>
export default {
    name: "NavBar",
    data() {
        return{}
    }
}
</script>