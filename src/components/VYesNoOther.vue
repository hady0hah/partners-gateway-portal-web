<template>
  <div>
      <v-radio-group v-model="model" v-on:change="valueChange()" row  v-bind="$attrs">
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
        <v-radio label="Other" :value="null"></v-radio>
        <v-text-field v-if="model === null" v-model="model" label="Other"
          outlined></v-text-field>
      </v-radio-group>
  </div>
</template>
<script>

import ComponentMapper from "@/components/ComponentMapper";
import FormMixin from "@/mixins/FormMixin";


export default {
  props : ['field','form_name'],
  mixins : [FormMixin],
  methods: {
    getFieldComponent() {
      return ComponentMapper.mapType(this.field, this.name)
    },
    getFieldProps() {
      return ComponentMapper.mapProps(this.field)
    },
  },
  created() {
    console.log(this.field)
  },
  data() {
    return {
      model: null,
    }
  },
}
</script>
