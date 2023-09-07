<template>
    <parent-form  lazy-validation :config="formConfig" ref="formRef">
      <template v-slot:section-fields="{ section }" >

<!--            <form-field :field="field" :form_name="form_name" v-bind:value="getFieldValue(field)" v-on:input="onInput(field,$event)"></form-field>-->

          <div>
            <v-row class="box">
              <v-row v-if="section.name === 'deal_details'" >
                <v-col class="col-12 col-md-4">
                  <form-field
                    :field="section.fields['accountManager']"  :form_name="formConfig.form_name" outlined>
                  </form-field>
                  <form-field
                    :field="section.fields['name']"  :form_name="formConfig.form_name" >
                  </form-field>
                  <form-field
                    :field="section.fields['region']"  :form_name="formConfig.form_name" outlined>
                  </form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <form-field
                    :field="section.fields['dealStatus']"  :form_name="formConfig.form_name" outlined>
                  </form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <date-picker v-bind="section.fields['renewal_date']" outlined>
                  </date-picker>
                  <form-field
                    :field="section.fields['reseller']"  :form_name="formConfig.form_name" >
                  </form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'end_customer_information'" >
                <v-col class="col-12 col-md-4">
                  <form-field
                    :field="section.fields['contact']"  :form_name="formConfig.form_name" outlined>
                  </form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'opportunity_information'" class="box" >
                <v-row>
                  <v-col class="col-12 col-md-4">
                    <form-field
                      :field="section.fields['opportunity_desc']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['budget']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['product']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <date-picker v-bind="section.fields['startDate']" outlined>
                    </date-picker>
                    <form-field
                      :field="section.fields['initiated_by']"  :form_name="formConfig.form_name" >
                    </form-field>
                    <date-picker v-bind="section.fields['lastMeetingDate']" outlined>
                    </date-picker>
                    <v-yes-no-other v-bind="section.fields['technicalPresentationOption']">
                    </v-yes-no-other>
                    <form-field
                      :field="section.fields['quantity']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['competitors']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <form-field
                      :field="section.fields['otherOption']"  :form_name="formConfig.form_name" >
                    </form-field>

                    <form-field
                      :field="section.fields['dealOS']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['notes']"  :form_name="formConfig.form_name" outlined>
                    </form-field>
                  </v-col>
                </v-row>
                <span class="horizontal-line"></span>
              </v-row>

            </v-row>
          </div>
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
// import ComponentMapper from "@/components/ComponentMapper";

export default {
  components: {
    VYesNoOther,
    DatePicker,
    FormField,
    ParentForm,
    // DealStatus,
  },
  // mixins: [ParentForm],
  data() {
    return {
      formConfig: {
        form_name : 'deal_view',
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
}
</style>
