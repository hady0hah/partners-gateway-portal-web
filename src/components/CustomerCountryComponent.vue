<template>
  <v-select :field="field" :items="Countries"  item-text="label" item-value="value" label="Country"
            v-model="country"
            v-bind:value="$attrs.value"
            v-bind="$attrs" v-on:change="countryChange()"  class="mb-2"></v-select>
</template>
<script>
import eventBus from "@/eventBus.js";
import ComponentMapper from "@/components/ComponentMapper";

export default {
  props: ['field','disabled','form_name','outlined'],
  data() {
    return {
      Countries:{},
      Cities:[],
      country:null,
    }
  },
  methods:{
    countryChange () {
      const t = this
      let getCitiesUrl = this.axios.defaults.endpoints.resolve(this.axios.defaults.endpoints.country.show, { id: this.country })
      this.axios.get(getCitiesUrl)
        .then(function (response) {
          t.$Progress.finish()
          t.Cities = response.data.data.cities
          eventBus.$emit('country-changed', t.Cities);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
    this.Countries = ComponentMapper.parseChoices(this.field.choices)
  },

}


</script>
