<template>
  <div class="home"></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  created() {
    axios({
      url: process.env.VUE_APP_BASE_API+'/',
      method: 'GET',
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
       axios({
      url: process.env.VUE_APP_BASE_API1+'/',
      method: 'GET',
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  components: {},
}
</script>
