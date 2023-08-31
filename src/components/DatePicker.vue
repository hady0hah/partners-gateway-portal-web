<template>
    <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field append-icon="mdi-calendar" v-model="model" readonly v-bind="$attrs"
          v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="model" @input="menu2 = false" v-bind:value="$attrs.value" v-on:input="$emit('input', $event)"></v-date-picker>
    </v-menu>
</template>
<script>

export default {
  data() {
    return {
      model: null,
    }
  },
  methods : {
    oni($event){
      console.log($event)
      this.$emit('input', $event)
    }
  }
}
</script>
