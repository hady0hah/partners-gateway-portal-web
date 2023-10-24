<template>
  <span>
      <form-field style="margin-top: 70px" :field="field" :form_name="form_name" v-bind:value="$attrs.value" v-on:input="$emit('input',$event)" :disabled="disabled" :outlined="outlined"></form-field>
    <v-dialog ref="dialogRef" v-if="!disabled" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn style="margin-top: -10px;"  color="primary" dark class="mb-2" v-bind="attrs" v-on="on" small elevation="0">Add New Customer</v-btn>
    </template>
    <v-container  fluid style="background-color: white">
      <v-layout class="pa-4">
        <parent-form lazy-validation :config="formConfig" ref="formRef">
          <template v-slot:header-back>
          <v-btn  class="mr-4" color="primary" @click="close" small elevation="0" >Cancel</v-btn>
          </template>
        </parent-form>
      </v-layout>
    </v-container>
   </v-dialog>
  </span>
</template>
<script>
import ParentForm from '@/views/base/BaseFormGeneratorView.vue';
import EventBus from "@/eventBus.js";
import FormField from "@/components/FormField.vue";
import ComponentMapper from "@/components/ComponentMapper";
import CustomerCountryComponent from '@/components/CustomerCountryComponent.vue'
import CustomerCityComponent from '@/components/CustomerCityComponent.vue'
export default {
  props: ['field','disabled','form_name','outlined'],
  components:{
    ParentForm,
    FormField,
  },
  data() {
    return {
      dialog:false,
      formConfig:{
        form_fields : null,
        form_url: this.axios.defaults.endpoints.contact.form,
        form_add: this.axios.defaults.endpoints.contact.add,
        form_edit: this.axios.defaults.endpoints.contact.add,
        isDialog: true,

      },
    }
  },
  methods:{
    close () {
      this.dialog = false
    },
    handleFormSubmitted($event) {
      if (!this.field['choices']) {
        this.$set(this.field, 'choices', {});
      }
      let contact = {
        "attr": [],
        "label": $event.name,
        "value": $event.id.toString(),
      };
      this.$set(this.field['choices'], $event.id, contact);
      this.close();
    },
  },
  created() {
    EventBus.$on('form-submitted',this.handleFormSubmitted)
    ComponentMapper.addMapping('country',{'component': CustomerCountryComponent})
    ComponentMapper.addMapping('city',{'component': CustomerCityComponent})
  },
  destroyed() {
    EventBus.$off('form-submitted',this.handleFormSubmitted)
  },
}


</script>
