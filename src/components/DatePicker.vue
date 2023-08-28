<template>
  <v-row>
    <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="model" prepend-icon="mdi-calendar" readonly v-bind="$attrs"
          v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="model" @input="menu2 = false"></v-date-picker>
    </v-menu>
  </v-row>
</template>
<script>

export default {
  data() {
    return {
      model: null,
    }
  },
}
</script>