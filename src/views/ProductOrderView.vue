<template>
  <parent-form lazy-validation :config="formConfig" ref="formRef">
    <template v-slot:form-sections="{ form }">
      <v-col class="box col-12" v-for="section, i in form.form" :key="i">
        <form-section v-if="section.name == 'order_details'" :section="section">
          <template v-slot:section-fields="{ section }">
            <v-col class="col-12 col-md-5">
              <div v-for="(field, k) in section.fields" :key="k">
                <div v-if="field['fields']">
                  <product-list-form :fields="field.fields" :form_name="formConfig.form_name" v-bind:value="getFieldValue(field)" v-on:input="onInput(field, $event)"></product-list-form>
                </div>
              </div>
            </v-col>

            <v-col class="col-12 col-md-5">
              <div v-if="section.fields['endCustomer']" class="mb-4"
                style=";font-weight: bold;color: #205023;margin-top: -60px">
                <p>{{ section.fields['endCustomer'].label }}</p>
              </div>
              <form-field style="margin-top: 65px" :field="section.fields['endCustomer']"
                :form_name="formConfig.form_name" v-bind:value="getFieldValue(section.fields['endCustomer'])"
                v-on:input="onInput(section.fields['endCustomer'], $event)" outlined></form-field>
              <add-new-customer-form-component></add-new-customer-form-component>
            </v-col>

          </template>
        </form-section>
        <form-section v-if="section.name == 'payment_terms'" :section="section">
          <template v-slot:section-fields="{ section }">
            <v-col class="col-12 col-md-12">
              <form-field :field="section.fields['paymentTerms']" :form_name="formConfig.form_name"
                :disabled="formConfig.disabled" v-bind:value="getFieldValue(section.fields['paymentTerms'])"
                v-on:input="onInput(section.fields['paymentTerms'], $event)" outlined></form-field>
            </v-col>
          </template>
        </form-section>
      </v-col>
    </template>
  </parent-form>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
// import eventBus from '@/eventBus.js';
import FormField from "@/components/FormField";
import FormSection from "@/components/FormSection";
import FormMixin from "@/mixins/FormMixin"
import ProductListForm from '@/components/ProductListForm.vue';
import AddNewCustomerFormComponent from "@/components/AddNewCustomerFormComponent";

export default {
  props: ['fields'],
  components: {
    FormField,
    ParentForm,
    FormSection,
    AddNewCustomerFormComponent,
    ProductListForm,
  },
  mixins: [FormMixin],
  data() {
    return {
      response: [],
      model: {},
      formConfig: {
        form_name: 'po_view',
        form_url: this.axios.defaults.endpoints.po.form,
        form_add: this.axios.defaults.endpoints.po.add,
        form_edit: this.axios.defaults.endpoints.po.edit,
        form_data: this.axios.defaults.endpoints.po.show,
        form_submit: this.axios.defaults.endpoints.po.submit,
        disabled: false,
      }
    };
  },
  mounted() {
    // const t = this
    // this.$Progress.start()
    // this.axios.get(axios.defaults.endpoints.po.form.url, {})
    //   .then(function (response) {
    //     t.$Progress.finish()
    //     t.response = response.data.data
    //     t.sendForm()
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  methods: {
    getFieldValue(field) {
      if (!this.model)
        this.model = {}
      if (!(field.name in this.model))
        this.model[field.name] = null
      return this.model[field.name]
    },
    onInput(field, $event) {
      this.model[field.name] = $event
      this.$emit('input', this.model)
    },
    handleDataReceived(data) {
      this.model=data
    }
    // sendForm(){
    //   eventBus.$emit('form-received', this.response);
    // },
    // submitForm() {
    //   var endpoint = ""
    //   const t = this
    //   if (!t.baseForm.id)
    //     endpoint = axios.defaults.endpoints.deal_add.url
    //   else
    //     endpoint = axios.defaults.endpoints.deal_edit.url+t.deal.id

    //   ParentForm.methods.submitForm(this.response,endpoint,t,this.$refs);
    // },
  },
};
</script>
<style>.products-table th,
.products-table td {
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 10px;
  padding-top: 10px;
}</style>
