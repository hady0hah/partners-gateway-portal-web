<template>
  <component
      :field="field"
      :outlined="outlined"
      item-text="label"
      :is="getFieldComponent()"
      v-bind="getFieldProps()"
      v-model="form[field.name]"
      v-on:change="valueChange()">
  </component>
</template>
<script>
import ComponentMapper from "@/components/ComponentMapper";
import FormMixin from "@/mixins/FormMixin";

export default {
  props : ['field','form_name','outlined'],
  mixins : [FormMixin],
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
