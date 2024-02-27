<template>

   <h1>Error 404</h1>
   <div>
    <img src="@/assets/404.jpg" alt="Error 404">
  </div>

  </template>
  
  <script>
 
  
  export default {
    name: 'ErrorPage404',
    data() {
      return {
        Id: this.$route.params.Id,
      };
    },
}

</script>