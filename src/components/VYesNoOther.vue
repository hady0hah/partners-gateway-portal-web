<template>
  <v-radio-group label="" v-model="model" v-on:change="valueChange()" v-bind="$attrs">
      <p style="color: #205023">{{$attrs.label}}</p>
    <div style="display: flex; flex-direction: row;">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Other" :value="null"></v-radio>
      <v-text-field v-if="model === null" v-model="model" label="Other" outlined></v-text-field>
    </div>
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
