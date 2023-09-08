<template>

  <parent-form  lazy-validation :config="formConfig" ref="formRef">
    <template v-slot:form-sections="{ form }" >
      <v-col class="box col-12" v-for="(section, i) in form.form" :key="i">
        <form-section  :section="section">
          <template v-slot:section-fields="{ section }"  >

            <v-row class="box">
            <v-row v-if="section.name === 'section_1'" >
              <v-col class="col-12 col-md-4">
                <date-picker v-bind="section.fields['created']"  v-bind:value="section.fields['created'].date" v-on:input="onInput(section.fields['created'],$event)" outlined>
                </date-picker>
                <check-box-field-component  v-bind:value="section.fields['activities'].value" v-on:input="onInput(section.fields['activities'],$event)"
                                            :name="section.fields['activities'].full_name"   :v-bind="section.fields['activities']" >
                </check-box-field-component>
              </v-col>
              <v-col class="col-12 col-md-4">
                    <date-picker
                      v-bind="section.fields['startDate']" outlined :name="section.fields['startDate'].full_name"
                      v-bind:value="getFieldValue(section.fields['startDate'])" v-on:input="onInput(section.fields['startDate'], $event)"></date-picker>
                    <date-picker
                      v-bind="section.fields['endDate']" outlined :name="section.fields['endDate'].full_name"
                      v-bind:value="getFieldValue(section.fields['endDate'])" v-on:input="onInput(section.fields['endDate'], $event)"></date-picker>
                <form-field :field="section.fields['products']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['products'])" v-on:input="onInput(section.fields['products'],$event)" outlined
                ></form-field>
                <form-field :field="section.fields['description']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['description'])" v-on:input="onInput(section.fields['description'],$event)"
                ></form-field>
              </v-col>
              <v-col class="col-12 col-md-4">
                <form-field :field="section.fields['outreach']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['outreach'])" v-on:input="onInput(section.fields['outreach'],$event)" outlined
                ></form-field>
                <form-field :field="section.fields['targetLeadsNb']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['targetLeadsNb'])" v-on:input="onInput(section.fields['targetLeadsNb'],$event)" outlined
                ></form-field>
                <form-field :field="section.fields['additionalInfo']" :form_name="formConfig.form_name"
                                          v-bind:value="getFieldValue(section.fields['additionalInfo'])" v-on:input="onInput(section.fields['additionalInfo'],$event)" outlined
              ></form-field>
              </v-col>
            </v-row>

            <v-row v-if="section.name === 'section2'" >
              <v-col class="col-12 col-md-5">

                <table >
                  <thead><tr>
                    <th>{{ section.fields['resourceAllocation']['fields']['resouce_allocation'].label }}</th>
                    <th>{{section.fields['resourceAllocation']['fields']['amount'].label }}</th>
                  </tr></thead>
                  <tbody ><tr><td style="width: 450px">
                    <form-field :field="section.fields['resourceAllocation']['fields']['resouce_allocation']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['resourceAllocation']['fields']['resouce_allocation'])" v-on:input="onInput(section.fields['resourceAllocation']['fields']['resouce_allocation'],$event)" outlined
                    ></form-field>

                  </td><td style="padding: 5px;">
                    <form-field :field="section.fields['resourceAllocation']['fields']['amount']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['resourceAllocation']['fields']['amount'])" v-on:input="onInput(section.fields['resourceAllocation']['fields']['amount'],$event)" outlined
                    ></form-field>
                  </td></tr></tbody>
                </table>

              </v-col>
              <v-col class="col-12 col-md-5">
                <form-field :field="section.fields['totalAmount']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['totalAmount'])" v-on:input="onInput(section.fields['totalAmount'],$event)" outlined
                ></form-field>
                <form-field :field="section.fields['percentageActivity']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['percentageActivity'])" v-on:input="onInput(section.fields['percentageActivity'],$event)" outlined
                ></form-field>
                <form-field :field="section.fields['additionalComments']" :form_name="formConfig.form_name"
                            v-bind:value="getFieldValue(section.fields['additionalComments'])" v-on:input="onInput(section.fields['additionalComments'],$event)" outlined
                ></form-field>
              </v-col>
            </v-row>

          </v-row>
          </template>
        </form-section>
      </v-col>
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
import FormSection from "@/components/FormSection";
import FormMixin from "@/mixins/FormMixin"

export default {
  components: {
    ParentForm,
    VYesNoOther,
    CheckBoxFieldComponent,
    DatePicker,
    FormField,
    DealStatus,
    FormSection,
  },
  mixins: [FormMixin],
  data() {
    return {
      response : [],
      model: {},
      formConfig: {
        form_name : 'mdf_view',
        form_url: this.axios.defaults.endpoints.mdf.form,
        form_add: this.axios.defaults.endpoints.mdf.add,
        form_edit: this.axios.defaults.endpoints.mdf.edit,
        form_data: this.axios.defaults.endpoints.mdf.show,
        disabled: false,
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
<style>
.products-table th,
.products-table td {
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
