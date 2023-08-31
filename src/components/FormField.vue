<template>
  <component
      item-text="label"
      :is="getFieldComponent()"
      v-bind="getFieldProps()"
      v-bind:value="$attrs.value"
      v-on:input="$emit('input', $event)">
  </component>
</template>
<script>
import ComponentMapper from "@/components/ComponentMapper";

export default {
  props : ['field','form_name'],
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
