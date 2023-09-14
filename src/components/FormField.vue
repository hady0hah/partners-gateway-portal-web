<template>
  <component
      :field="field"
      :outlined="outlined"
      item-text="label"
      :is="getFieldComponent()"
      v-bind="getFieldProps()"
      v-bind:value="$attrs.value"
      v-on:input="$emit('input', $event)"
      :disabled="disabled">
  </component>
</template>
<script>
import ComponentMapper from "@/components/ComponentMapper";

export default {
  props : ['field','form_name','outlined', 'disabled'],
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
