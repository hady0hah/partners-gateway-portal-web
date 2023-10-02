<template>
  <v-col class="col-12">
    <v-alert :value="errors ? true : false" color="error" outlined>
      {{ getErrorsString() }}
    </v-alert>
  </v-col>
</template>
<script>
import ComponentMapper from "@/components/ComponentMapper";

export default {
  props: ['errors'],
  methods: {
    getErrorsString() {
      return this.errors && this.errors.join(`<br>`) ? this.errors.join(`<br>`) : "The form contains errors. Fixing them and re-submitting might work!"
    },
    getFieldComponent() {
      return ComponentMapper.mapType(this.field, this.form_name)
    },
    getFieldProps() {
      return ComponentMapper.mapProps(this.field)
    },
  },
}
</script>
