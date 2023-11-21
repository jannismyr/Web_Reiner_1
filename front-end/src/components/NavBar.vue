<template>
  <nav>
    <ul>
        <router-link to="/veranstaltungen">
            <li><a href="#">Startseite</a></li>
        </router-link>
        
        <li><a href="#">Genehmigt</a></li>
        <li><a href="#">Nicht-genehmigt</a></li>
        <li><a href="#">Admin</a></li>
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