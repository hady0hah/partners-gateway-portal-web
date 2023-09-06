<template>
    <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on }">
        <v-text-field append-icon="mdi-calendar" v-model="model" readonly v-bind="$attrs" 
          v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="model" @input="menu2 = false" v-on:input="$emit('input', $event)"></v-date-picker>
    </v-menu>
</template>
<script>
import moment from 'moment'


export default {
  data() {
    return {
      model: null,
    }
  },
  methods : {
  },
  created() {
    if (this.$attrs.value && 'date' in this.$attrs.value) {
      this.model = moment(this.$attrs.value.date).format('YYYY-MM-DD')
      this.$emit('input', this.model)
    }
  }
}
</script>
