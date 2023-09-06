<template>
  <v-radio-group style="margin-top:-4px" v-bind="$attrs" v-bind:value="$attrs.value" v-model="model" v-on:input="$emit('input', $event)">
      <!-- <p style="color: #205023;display: none;">{{$attrs.label}}</p> -->
      <v-row>
        <v-col><v-radio label="Yes" :value="true"></v-radio></v-col>
        <v-col><v-radio label="No" :value="false"></v-radio></v-col>
        <v-col><v-radio label="Other" :value="null"></v-radio></v-col>
        <v-col></v-col>
        <v-col class="col-12">
          <v-text-field :disabled="model === true || model === false" label="Other" outlined v-bind:value="$attrs.value" v-on:input="$emit('input', $event)"></v-text-field>
        </v-col>
      </v-row>
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
