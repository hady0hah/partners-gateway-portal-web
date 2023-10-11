<template>
  <parent-form lazy-validation :config="formConfig" ref="formRef">
    <template v-slot:form-sections="{ form, errorMessages }">
      <v-col class="box col-12" v-for="(section, i) in form.form" :key="i">
        <form-section :section="section" :error-messages="errorMessages">
          <template v-slot:section-fields="{ section, errorMessages }">

            <v-row class="box">
              <v-row v-if="section.name === 'section_1'">
                <v-col class="col-12 col-md-4">
<!--                  <date-picker v-bind="section.fields['created']" :field="section.fields['created']" v-bind:value="getFieldValue(section.fields['created'])"-->
<!--                    v-on:input="onInput(section.fields['created'], $event)"-->
<!--                    outlined>-->
<!--                  </date-picker>-->
                  <check-box-field-component
                    :error-messages="getErrors('activities',errorMessages).fields"
                    :field="{ activities: section.fields['activities'], otherOption: section.fields['otherOption'] }"
                    v-bind:value="{ activities: getFieldValue(section.fields['activities']), otherOption: getFieldValue(section.fields['otherOption']) }"
                    v-on:input="onActivitiesInput($event)" outlined>
                  </check-box-field-component>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <date-picker :field="section.fields['startDate']"
                    :error-messages="getErrors('startDate',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['startDate'])"
                    v-on:input="onInput(section.fields['startDate'], $event)" outlined>
                  </date-picker>
                  <date-picker :field="section.fields['endDate']" 
                    :error-messages="getErrors('endDate',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['endDate'])"
                    v-on:input="onInput(section.fields['endDate'], $event)" outlined>
                  </date-picker>
                  
                  <v-radio-group :label="section.fields['products'].label" :error-messages="getErrors('products',errorMessages)">
                    <v-checkbox v-for="v,k in section.fields['products'].choices" :key="k" 
                      :name="section.fields['products'].full_name" 
                      v-bind="v" 
                      v-on:change="onInput(section.fields['products'], $event)" 
                      v-bind:input-value="getFieldValue(section.fields['products'])"></v-checkbox>
                  </v-radio-group>                 

                  <form-field :field="section.fields['description']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('description',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['description'])"
                    v-on:input="onInput(section.fields['description'], $event)" outlined></form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['outreach']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('outreach',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['outreach'])"
                    v-on:input="onInput(section.fields['outreach'], $event)" outlined></form-field>
                  <form-field :field="section.fields['targetLeadsNb']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('targetLeadsNb',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['targetLeadsNb'])"
                    v-on:input="onInput(section.fields['targetLeadsNb'], $event)" outlined></form-field>
                  <form-field :field="section.fields['additionalInfo']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('additionalInfo',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['additionalInfo'])"
                    v-on:input="onInput(section.fields['additionalInfo'], $event)" outlined></form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'section2'">
                <v-col class="col-12 col-md-5">
                  <product-list-form :disabled="formConfig.disabled" 
                    :error-messages="getErrors('resourceAllocation',errorMessages).fields"
                    :first_field_name="'resouce_allocation'" 
                    :second_field_name="'amount'" 
                    :fields="section.fields['resourceAllocation']['fields']" 
                    :form_name="formConfig.form_name" 
                    v-bind:value="getFieldValue(section.fields['resourceAllocation'])" 
                    v-on:input="onInput(section.fields['resourceAllocation'], $event)" 
                    v-bind="section.fields['resourceAllocation']"></product-list-form>
                </v-col>
                <v-col class="col-12 col-md-5">
                  <form-field :field="section.fields['totalAmount']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('totalAmount',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['totalAmount'])"
                    v-on:input="onInput(section.fields['totalAmount'], $event)" outlined></form-field>
                  <form-field :field="section.fields['percentageActivity']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('percentageActivity',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['percentageActivity'])"
                    v-on:input="onInput(section.fields['percentageActivity'], $event)" outlined></form-field>
                  <form-field :field="section.fields['additionalComments']" :form_name="formConfig.form_name"
                    :error-messages="getErrors('additionalComments',errorMessages)"
                    v-bind:value="getFieldValue(section.fields['additionalComments'])"
                    v-on:input="onInput(section.fields['additionalComments'], $event)" outlined></form-field>
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
import FormField from "@/components/FormField";
import DatePicker from "@/components/DatePicker";
import CheckBoxFieldComponent from "@/components/CheckBoxFieldComponent";
import FormSection from "@/components/FormSection";
import FormMixin from "@/mixins/FormMixin"
import ProductListForm from '@/components/ProductListForm.vue';
import CollectionMixin from "@/mixins/CollectionMixin";

export default {
  components: {
    ParentForm,
    CheckBoxFieldComponent,
    DatePicker,
    FormField,
    FormSection,
    ProductListForm,
  },
  mixins: [FormMixin,CollectionMixin],
  data() {
    return {
      response: [],
      model: {},
      formConfig: {
        form_name: 'mdf_view',
        form_url: this.axios.defaults.endpoints.mdf.form,
        form_add: this.axios.defaults.endpoints.mdf.add,
        form_edit: this.axios.defaults.endpoints.mdf.edit,
        form_data: this.axios.defaults.endpoints.mdf.show,
        form_submit: this.axios.defaults.endpoints.mdf.submit,
        display_submit_button: true,
        disabled: null,
      }
    };
  },
  created() {
    if(this.formConfig.disabled === null)
      this.formConfig.disabled = this.$route.params.disabled
  },
  mounted() {
  },
  methods: {
    getErrors(fieldName,errorMessages) {
      return errorMessages && fieldName in errorMessages ? errorMessages[fieldName] : []
    },
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
    onActivitiesInput($event) {
      if (!('activities' in this.$attrs.value))
        this.$attrs.value['activities'] = {}
      if (!('otherOption' in this.$attrs.value))
        this.$attrs.value['otherOption'] = {}
      this.$attrs.value = { ...this.$attrs.value, ...$event }
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
