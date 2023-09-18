<template>
  <v-menu  v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
    <template v-slot:activator="{ on }">
      <v-text-field append-icon="mdi-calendar" v-model="$attrs.value" readonly v-bind="$attrs" :label="field.label"
        :name="field.full_name" v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="$attrs.value" @input="menu2 = false" v-on:input="$emit('input', $event)"></v-date-picker>
  </v-menu>
</template>
<script>
import moment from 'moment'


export default {
  props: ['field'],
  data() {
    return {
      model: null,
      menu2: false,
    }
  },
  methods: {
    formatDate() {
      if (this.$attrs.value) {
        var d = ""
        if (typeof this.$attrs.value == "string") {
          d = this.$attrs.value
        } else if ('date' in this.$attrs.value) {
          d = this.$attrs.value.date
        }
        this.$attrs.value = moment(d).format('YYYY-MM-DD')
        this.$emit('input', this.$attrs.value)
      }
    }
  },
  mounted() {
    this.formatDate()
  },
  updated() {
    this.formatDate()
  }
}
</script>
