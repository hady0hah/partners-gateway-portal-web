<template>
  <v-col class="col-12">
    <v-alert :value="errors ? true : false" color="error" outlined>
      {{ errors.join('<br>') }}
    </v-alert>
  </v-col>
</template>
<script>
import ComponentMapper from "@/components/ComponentMapper";

export default {
  props: ['errors'],
  methods: {
    getFieldComponent() {
      return ComponentMapper.mapType(this.field, this.form_name)
    },
    getFieldProps() {
      return ComponentMapper.mapProps(this.field)
    },
  },
}
</script>
