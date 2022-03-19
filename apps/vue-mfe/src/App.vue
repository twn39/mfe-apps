<template>
  <div class="vue-mfe">
    <p>{{title}}</p>
    <img width="300" src="../assets/images/vue.jpg" alt="">
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        title: 'Vue MFE.',
      }
    },
  });
</script>

<style scoped lang="scss">
</style>
