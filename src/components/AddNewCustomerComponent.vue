<template>
  <span>
      <form-field :field="field" :form_name="form_name" v-bind:value="$attrs.value" v-on:input="$emit('input',$event)" :disabled="disabled" :outlined="outlined"></form-field>
    <v-dialog ref="dialog" v-if="!disabled">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" small elevation="0">Add New Customer</v-btn>
    </template>
    <v-container  fluid style="background-color: white">
      <v-layout class="pa-4">
        <parent-form lazy-validation :config="formConfig" ref="formRef"></parent-form>
      </v-layout>
    </v-container>
   </v-dialog>
  </span>
</template>
<script>
import ParentForm from '@/views/base/BaseFormGeneratorView.vue';
import CustomerFields from '@/components/AddNewCustomerFields.js'
import EventBus from "@/eventBus.js";
import FormField from "@/components/FormField.vue";
export default {
  props: ['field','disabled','form_name','outlined'],
  components:{
    ParentForm,
    FormField,
  },
  data() {
    return {
      formConfig:{
        form_fields : CustomerFields,
        form_add: this.axios.defaults.endpoints.contact.add,
      },
    }
  },
  methods:{
    handleFormSubmitted($event) {
      let contact = { attr:[], label: $event.name , value: $event.id }
      this.field['choices'][parseInt($event.id)] = contact;
      this.$refs.dialog.close()
    },
    mockSubmit(){

    }
  },
  created() {
    EventBus.$on('form-submitted',this.handleFormSubmitted)
    console.log(this.field['choices'])
  },
  destroyed() {
    EventBus.$off('form-submitted',this.handleFormSubmitted)
  },
}


</script>
