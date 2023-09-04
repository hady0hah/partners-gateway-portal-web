<template>
  <v-row class="pa-4">
    <v-col class="col-12">
      <div v-if="section.label" class="mb-4" style="font-weight: bold;color: #205023" >
        <p>{{ section.label }}</p>
      </div>
      <div v-if="section.description" class="mb-4">
        <h3>{{ section.description }}</h3>
      </div>
    </v-col>
    <v-col v-for="field, k in section.fields" :key="k" :class="field.row_class?field.row_class:'col-12 col-md-4'">
      <form-field :field="field" :form_name="form_name" v-bind:value="getFieldValue(field)" v-on:input="onInput(field,$event)"></form-field>
    </v-col>
  </v-row>
</template>
<script>
// import FormMixin from '@/mixins/FormMixin';
import FormField from './FormField.vue';

export default {
  props : ['section','form_name'],
  components : {
    FormField
  },
  // mixins : [FormMixin],
  data() {
    return {
    }
  },
  methods: {
    getFieldValue(field) {
      if(!this.$attrs.value)
        this.$attrs.value = {}
      if(!(field.name in this.$attrs.value))
        this.$attrs.value[field.name] = null
      return this.$attrs.value[field.name]
    },
    onInput(field, $event) {
      this.$attrs.value[field.name] = $event
      this.$emit('input', this.$attrs.value)
    }
  },
}
</script>
