<template>
  <v-select :items="Cities" item-text="name" item-value="id" label="City"
            v-on:input="$emit('input',$event)"
            v-bind="$attrs"   class="mb-2" :clearable="!$attrs.required"></v-select>
</template>
<script>
import eventBus from "@/eventBus.js";

export default {
  props: ['field','disabled','form_name','outlined'],
  data() {
    return {
      Countries:[],
      Cities:[],
    }
  },
  methods:{
    handleCountryChanged(data){
      this.Cities = data
    },
  },
  created() {
    eventBus.$on('country-changed', this.handleCountryChanged);
  },
  destroyed() {
    eventBus.$off('country-changed', this.handleCountryChanged);
  },
}


</script>
