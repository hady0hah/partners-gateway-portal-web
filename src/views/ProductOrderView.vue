<template>
  <div class="container">
    <parent-form  lazy-validation :config="formConfig" ref="formRef" v-model="model" >
      <template v-slot:header-left-post-back>
      </template>
      <template v-slot:form-sections>
        <v-row class="box mt-15" v-for="(section, i) in form.form" :key="i">
          <div v-if="section.label" class="mb-4" style="padding: 10px;font-weight: bold;color: #205023" >
            <p >{{ section.label }}</p>
          </div>
          <div v-if="section.description" class="mb-4">
            <h3>{{ section.description }}</h3>
          </div>

          <v-col class="col-12 col-md-5">
            <div v-for="(field, k) in section.fields" :key="k" >
              <div v-if="field['fields']">
                <table style="margin-top: 50px;width: 450px" class="products-table"><thead><tr><th>{{field['fields']['product']['label'] }}</th><th>{{field['fields']['quantity']['label'] }}</th></tr></thead>
                  <tbody ><tr><td style="width: 450px">
                    <form-field :field="field['fields']['product']" :form="form" :form_name="formConfig.form_name" outlined>
                    </form-field></td><td style="padding: 5px;">
                    <form-field
                      :field="field['fields']['quantity']" :form="form" :form_name="formConfig.form_name" outlined>
                    </form-field></td></tr></tbody>
                </table>
              </div>
            </div>
          </v-col>

          <v-col class="col-12 col-md-5">
            <div v-if="section.fields['end_customer']" class="mb-4" style=";font-weight: bold;color: #205023" >
              <p>{{ section.fields['end_customer'].label }}</p>
            </div>
            <form-field
              style="padding: 45px"
              :field="section.fields['end_customer']" :form="form" :form_name="formConfig.form_name" outlined>
            </form-field>
          </v-col>

          <v-col class="col-12 col-md-12">
            <form-field
              :field="section.fields['paymentTerms']" :form="form" :form_name="formConfig.form_name" outlined>
            </form-field>
          </v-col>
        </v-row>
      </template>
    </parent-form>
  </div>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import eventBus from '@/eventBus.js';
import FormField from "@/components/FormField";

export default {
  props : ['fields'],
  components: {
    FormField,
    ParentForm,
  },
  mixins: [ParentForm],
  data() {
    return {
      response : [],
      model: {},
      formConfig: {
        form_name : 'po_view',
        form_url: this.axios.defaults.endpoints.po.form,
        form_action: this.axios.defaults.endpoints.po.add,
        main_action_onsubmit:this.submitForm,
      }
    };
  },
  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.po.form.url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.response = response.data.data
        t.sendForm()
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    sendForm(){
      eventBus.$emit('form-received', this.response);
    },
    submitForm() {
      var endpoint = ""
      const t = this
      if (!t.baseForm.id)
        endpoint = axios.defaults.endpoints.deal_add.url
      else
        endpoint = axios.defaults.endpoints.deal_edit.url+t.deal.id

      ParentForm.methods.submitForm(this.response,endpoint,t,this.$refs);
    },
  },
};
</script>
<style>
.products-table th,.products-table td{
  border-bottom:1px solid #E0E0E0;
  padding-bottom:10px;
  padding-top:10px;
}
</style>
