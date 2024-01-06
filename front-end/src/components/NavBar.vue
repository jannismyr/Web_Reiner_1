<template>
  <nav>
    <ul>
        <router-link to="/hauptseite">
            <li><a href="#">Startseite</a></li>
        </router-link>

        <li><a href="#">Genehmigt</a></li>

        <router-link to="/nicht-genehmigt">
            <li><a href="#">Nicht-genehmigt</a></li>
        </router-link>
       
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