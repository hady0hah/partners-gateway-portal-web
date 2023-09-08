<template>
  <parent-form lazy-validation :config="formConfig" ref="formRef">
    <template v-slot:form-sections="{ form }">
      <v-col class="box col-12" v-for="section, i in form.form" :key="i">
        <form-section :section="section" >
          <template v-slot:section-fields="{ section }">
            <!--            <form-field :field="field" :form_name="form_name" v-bind:value="getFieldValue(field)" v-on:input="onInput(field,$event)"></form-field>-->

            <v-row class="box">
              <v-row v-if="section.name === 'deal_details'">
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['accountManager']" :form_name="formConfig.form_name"
                    v-bind:value="getFieldValue(section.fields['accountManager'])"
                    v-on:input="onInput(section.fields['accountManager'], $event)" outlined></form-field>
                  <form-field :field="section.fields['name']" :form_name="formConfig.form_name"
                    v-bind:value="getFieldValue(section.fields['name'])"
                    v-on:input="onInput(section.fields['name'], $event)"></form-field>
                  <form-field :field="section.fields['region']" :form_name="formConfig.form_name"
                    v-bind:value="getFieldValue(section.fields['region'])"
                    v-on:input="onInput(section.fields['region'], $event)" outlined></form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['dealStatus']" :form_name="formConfig.form_name"
                    v-bind:value="getFieldValue(section.fields['dealStatus'])"
                    v-on:input="onInput(section.fields['dealStatus'], $event)" outlined></form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <date-picker v-bind="section.fields['renewal_date']" v-bind:value="section.fields['renewal_date'].date"
                    v-on:input="onInput(section.fields['renewal_date'], $event)" outlined>
                  </date-picker>
                  <form-field :field="section.fields['reseller']" :form_name="formConfig.form_name"
                    v-bind:value="getFieldValue(section.fields['reseller'])"
                    v-on:input="onInput(section.fields['reseller'], $event)"></form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'end_customer_information'">
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['contact']" :form_name="formConfig.form_name"
                    v-bind:value="getFieldValue(section.fields['contact'])"
                    v-on:input="onInput(section.fields['contact'], $event)" outlined></form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'opportunity_information'" class="box">
                <v-row>
                  <v-col class="col-12 col-md-4">
                    <form-field :field="section.fields['opportunity_desc']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['opportunity_desc'])"
                      v-on:input="onInput(section.fields['opportunity_desc'], $event)" outlined></form-field>
                    <form-field :field="section.fields['budget']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['budget'])"
                      v-on:input="onInput(section.fields['budget'], $event)" outlined></form-field>
                    <form-field :field="section.fields['product']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['product'])"
                      v-on:input="onInput(section.fields['product'], $event)" outlined></form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <date-picker v-bind="section.fields['startDate']" v-bind:value="section.fields['startDate'].date"
                      v-on:input="onInput(section.fields['startDate'], $event)" outlined>
                    </date-picker>
                    <form-field :field="section.fields['initiated_by']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['initiated_by'])"
                      v-on:input="onInput(section.fields['initiated_by'], $event)"></form-field>
                    <date-picker v-bind="section.fields['lastMeetingDate']"
                      v-bind:value="section.fields['lastMeetingDate'].date"
                      v-on:input="onInput(section.fields['lastMeetingDate'], $event)" outlined>
                    </date-picker>
                    <v-yes-no-other v-bind="section.fields['technicalPresentationOption']"
                      v-bind:value="getFieldValue(section.fields['technicalPresentationOption'])"
                      v-on:input="onInput(section.fields['technicalPresentationOption'], $event)">
                    </v-yes-no-other>
                    <form-field :field="section.fields['quantity']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['quantity'])"
                      v-on:input="onInput(section.fields['quantity'], $event)" outlined></form-field>
                    <form-field :field="section.fields['competitors']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['competitors'])"
                      v-on:input="onInput(section.fields['competitors'], $event)" outlined></form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <form-field :field="section.fields['otherOption']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['otherOption'])"
                      v-on:input="onInput(section.fields['otherOption'], $event)" outlined></form-field>
                    <form-field :field="section.fields['dealOS']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['dealOS'])"
                      v-on:input="onInput(section.fields['dealOS'], $event)" outlined></form-field>
                    <form-field :field="section.fields['notes']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['notes'])"
                      v-on:input="onInput(section.fields['notes'], $event)" outlined></form-field>
                  </v-col>
                </v-row>
                <span class="horizontal-line"></span>
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
// import eventBus from '@/eventBus.js';
import FormField from "@/components/FormField";
// import DealStatus from "@/components/DealStatuses";
import DatePicker from "@/components/DatePicker";
import VYesNoOther from "@/components/VYesNoOther";
import FormSection from "@/components/FormSection";
// import ComponentMapper from "@/components/ComponentMapper";

export default {
  components: {
    VYesNoOther,
    DatePicker,
    FormField,
    ParentForm,
    // DealStatus,
    FormSection,
  },
  // mixins: [ParentForm],
  data() {
    return {
      formConfig: {
        form_name: 'deal_view',
        form_url: this.axios.defaults.endpoints.deal.form,
        form_add: this.axios.defaults.endpoints.deal.add,
        form_edit: this.axios.defaults.endpoints.deal.edit,
        form_data: this.axios.defaults.endpoints.deal.show,
        disabled: false,
      }
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getFieldValue(field) {
      if (!this.$attrs.value)
        this.$attrs.value = {}
      if (!(field.name in this.$attrs.value))
        this.$attrs.value[field.name] = null
      return this.$attrs.value[field.name]
    },
    onInput(field, $event) {
      this.$attrs.value[field.name] = $event
      this.$emit('input', this.$attrs.value)
    },
  },
};
</script>
<style>
.horizontal-line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: black;
  margin-top: 40px;
  margin-bottom: 40px;
}</style>
