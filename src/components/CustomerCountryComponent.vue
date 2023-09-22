<template>
  <v-select :items="Countries" item-text="name" item-value="id" label="Country"
            v-model="country"
            v-bind="$attrs" v-on:change="countryChange()"  class="mb-2"></v-select>
</template>
<script>
import eventBus from "@/eventBus.js";

export default {
  props: ['field','disabled','form_name','outlined'],
  data() {
    return {
      Countries:[],
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
      this.saved = false
    },
  },
  created() {
    const t = this
    this.axios.get(this.axios.defaults.endpoints.country.list, {})
      .then(function (response) {
        t.$Progress.finish()
        t.Countries = response.data.data
      })
      .catch(err => {
        console.log(err);
      });
  },

}


</script>
