<template>
    <v-select      
      item-text="label"
      v-bind="$attrs"
      v-on:input="$emit('input',$event)"
    >
      <template v-slot:item="{ item }">
          <v-list-item-avatar>
            <img :src="item.icon"  />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
      </template>
    </v-select>
</template>
<script>

import ComponentMapper from "@/components/ComponentMapper";

export default {
  props : ['field','form_name'],

  methods: {
    getFieldComponent() {
      return ComponentMapper.mapType(this.field, this.name)
    },
    getFieldProps() {
      return ComponentMapper.mapProps(this.field)
    },
  },
  created() {
  },
  data() {
    return {
      model: null,
    }
  },
}
</script>
