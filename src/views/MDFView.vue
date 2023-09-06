<template>

  <parent-form  lazy-validation :config="formConfig" ref="formRef" v-model="model" >
    <template v-slot:header-left-post-back>
    </template>
    <template v-slot:form-sections >
      <v-row class="box mt-15" v-for="section, i in form.form" :key="i">

        <div class="container">
          <div v-if="section.label" class="mb-4" style="padding: 10px;font-weight: bold;color: #205023" >
            <p>{{ section.label }}</p>
          </div>
          <div v-if="section.description" class="mb-4">
            <h3>{{ section.description }}</h3>
          </div>
          <v-row class="box">

            <v-row v-if="section.name === 'section_1'" >
              <v-col class="col-12 col-md-4">
                <date-picker v-bind="section.fields['created']" outlined>
                </date-picker>
                <check-box-field-component
                  :v-bind="section.fields['activities']"  outlined>
                </check-box-field-component>
              </v-col>
              <v-col class="col-12 col-md-4">
                <table  >
                  <tbody ><tr><td  >
                    <date-picker v-bind="section.fields['startDate']" outlined>
                    </date-picker></td><td >
                    <date-picker v-bind="section.fields['endDate']" outlined>
                    </date-picker></td></tr></tbody>
                </table>
                <form-field
                  :field="section.fields['products']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
                <form-field
                  :field="section.fields['description']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
              </v-col>
              <v-col class="col-12 col-md-4">
                <form-field
                  :field="section.fields['outreach']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
                <form-field
                  :field="section.fields['targetLeadsNb']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
                <form-field
                  :field="section.fields['additionalInfo']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
              </v-col>
            </v-row>

            <v-row v-if="section.name === 'section2'" >
              <v-col class="col-12 col-md-5">

                <table >
                  <thead><tr><th>{{ section.fields['resourceAllocation']['fields']['resouce_allocation'].label }}</th>
                    <th>{{section.fields['resourceAllocation']['fields']['amount'].label }}</th></tr></thead>
                  <tbody ><tr><td style="width: 450px">
                    <form-field :field="section.fields['resourceAllocation']['fields']['resouce_allocation']" :form="form" :form_name="formConfig.form_name" outlined>
                    </form-field></td><td style="padding: 5px;">
                    <form-field
                      :field="section.fields['resourceAllocation']['fields']['amount']" :form="form" :form_name="formConfig.form_name" outlined>
                    </form-field>
                  </td></tr></tbody>
                </table>

              </v-col>
              <v-col class="col-12 col-md-5">
                <form-field
                  :field="section.fields['totalAmount']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
                <form-field
                  :field="section.fields['percentageActivity']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
                <form-field
                  :field="section.fields['additionalComments']" :form="form" :form_name="formConfig.form_name" outlined>
                </form-field>
              </v-col>
            </v-row>

          </v-row>
        </div>
      </v-row>
    </template>
  </parent-form>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import eventBus from '@/eventBus.js';
import ComponentMapper from "@/components/ComponentMapper";
import FormField from "@/components/FormField";
import DealStatus from "@/components/DealStatuses";
import DatePicker from "@/components/DatePicker";
import VYesNoOther from "@/components/VYesNoOther";
import CheckBoxFieldComponent from "@/components/CheckBoxFieldComponent";

export default {
  components: {
    ParentForm,
    VYesNoOther,
    CheckBoxFieldComponent,
    DatePicker,
    FormField,
    DealStatus,
  },
  mixins: [ParentForm],
  data() {
    return {
      response : [],
      model: {},
      formConfig: {
        form_name : 'mdf_view',
        form_url: this.axios.defaults.endpoints.deal_form.url,
        form_action: this.axios.defaults.endpoints.deal_add.url,
        main_action_onsubmit:this.submitForm,
      }
    };
  },
  created() {
  },
  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.mdf.form, {})
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
        endpoint = this.axios.defaults.endpoints.deal.add
      else
        endpoint = this.axios.defaults.endpoints.resolve(this.axios.defaults.endpoints.deal.edit, t.deal.id)

      ParentForm.methods.submitForm(this.response,endpoint,t,this.$refs);
    },
  },
};
</script>
