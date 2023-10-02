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
    <slot name="section-fields" v-bind:section="section" v-bind:error-messages="errorMessages">
    <v-col v-for="field, k in section.fields" :key="k" :class="getRowClass(field)">
      <form-field :field="field" :form_name="form_name" 
        :error-messages="errorMessages && field.name in errorMessages ? errorMessages[field.name] : []"
        v-bind:value="getFieldValue(field)" 
        v-on:input="onInput(field,$event)" 
        :disabled="disabled"></form-field>
    </v-col>
    </slot>
  </v-row>
</template>
<script>
import FormField from './FormField.vue';
import SectionMixin from "@/mixins/SectionMixin";

export default {
  props : ['section','form_name','row_class', 'disabled', 'errorMessages'],
  components : {
    FormField
  },
  mixins : [SectionMixin],
  data() {
    return {
    }
  },
  methods: {
    //TODO: HOT FIX:  rethink how to implement custom class for specific fields
    getRowClass(field) {
      return field.type == "Sonata\\AdminBundle\\Form\\Type\\CollectionType"?'col-12':'col-12 col-md-4'
    }
    // END OF HOT FIX
  },
}
</script>
