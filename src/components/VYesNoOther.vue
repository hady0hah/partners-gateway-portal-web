<template>
  <v-radio-group label="" v-bind="$attrs" v-bind:value="$attrs.value" v-model="model" v-on:input="$emit('input', $event)">
      <p style="color: #205023">{{$attrs.label}}</p>
    <div style="display: flex; flex-direction: row;">
      <v-radio label="Yes" :value="true"></v-radio>
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Other" :value="null"></v-radio>
      <v-text-field v-if="model !== true && model !== false" label="Other" outlined v-bind:value="$attrs.value" v-on:input="$emit('input', $event)"></v-text-field>
    </div>
  </v-radio-group>
</template>
<script>
export default {
  props : ['field','form_name'],
  data() {
    return {
      model:null
    }
  },
  methods : {
  }
}
</script>
