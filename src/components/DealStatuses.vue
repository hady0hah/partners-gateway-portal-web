<template>
    <v-select
      v-model="model"
      v-on:change="valueChange()"
      item-text="label"
      return-object
      v-bind="$attrs"
    >
      <template v-slot:item="{ item }">
        <template
          v-bind="$attrs"
          v-on:change="valueChange()">
          <v-list-item-avatar>
            <img :src="item.icon"  />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </template>
    </v-select>
</template>
<script>

import ComponentMapper from "@/components/ComponentMapper";
import FormMixin from "@/mixins/FormMixin";


export default {
  props : ['field','form_name'],
  mixins : [FormMixin],
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
