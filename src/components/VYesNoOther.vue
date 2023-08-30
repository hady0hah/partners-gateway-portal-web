<template>
      <v-radio-group v-model="model" v-on:change="valueChange()" row  v-bind="$attrs">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
        <v-radio label="Other" :value="null"></v-radio>
        <v-text-field v-if="model === null" v-model="model" label="Other"
          outlined></v-text-field>
      </v-radio-group>
</template>
<script>

import FormMixin from "@/mixins/FormMixin";


export default {
  props : ['field','form_name'],
  mixins : [FormMixin],
  data() {
    return {
      model: null,
    }
  },
}
</script>
