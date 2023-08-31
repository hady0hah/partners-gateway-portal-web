<template>
      <v-radio-group v-bind="$attrs" v-bind:value="$attrs.value" v-on:change="$emit('input', $event)" row>
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
        <v-radio label="Other" :value="null"></v-radio>
        <v-text-field v-if="$attrs.value === null" v-bind:value="$attrs.value" v-on:input="$emit('input', $event)" label="Other"
          outlined></v-text-field>
      </v-radio-group>
</template>
<script>
export default {
  props : ['field','form_name'],
  data() {
    return {
    }
  },
  methods : {
  }
}
</script>
