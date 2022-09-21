<template>
  <div class="home"></div>
</template>

<script>
import api from '../api/index.js'
export default {
  name: 'HomeView',
  data() {
    return {
      page:1,
      size:10
    }
  },
  created() {
   this.getMemberList()
   this.getSupplierList()
  },
  methods: {
    getMemberList(){
      api.getMemberList(this.page,this.size).then(response=>{
        console.log(response);
      }).catch(error=>{
        console.log(error);
      })
    },
     getSupplierList(){
      api.getSupplierList(this.page,this.size).then(response=>{
        console.log(response);
      }).catch(error=>{
        console.log(error);
      })
    }
  },
  components: {},
}
</script>
