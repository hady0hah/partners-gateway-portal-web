<template>
    <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="model" append-icon="mdi-calendar" readonly v-bind="$attrs"
          v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="model" @input="menu2 = false"></v-date-picker>
    </v-menu>
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
