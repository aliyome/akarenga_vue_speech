<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link to="/">VueDuolingo</router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style scoped>
.v-toolbar__title a {
  color: white;
  text-decoration: none;
}
.v-toolbar__title a:hover {
  color: white;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
});
</script>
