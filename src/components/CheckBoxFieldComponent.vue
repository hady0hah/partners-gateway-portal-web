<template>
  <v-radio-group label="" v-model="model" v-on:change="valueChange()" v-bind="$attrs">
    <p style="color: #205023;font-weight: bold">{{ $attrs['v-bind'].label }}</p>
    <div  v-for="(choice, key) in $attrs['v-bind']['choices']" :key="key" style="display: flex; flex-direction: row;">
      <input type="checkbox" v-model="model[choice.value]"/>
      <label style="padding: 2px;color: #205023;">{{ choice.label }}</label>
    </div>
    <div>
      <v-text-field v-model="model['other']" label="Other" outlined></v-text-field>
    </div>
  </v-radio-group>
</template>
<script>
import FormMixin from "@/mixins/FormMixin";
export default {
  props : ['field','form_name'],
  mixins : [FormMixin],
  created() {
    console.log(this.$attrs['v-bind']['choices'])
  },
  data() {
    return {
      model: [],
    }
  },
}
</script>
