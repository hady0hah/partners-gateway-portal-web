<template>
  <div class="container">
    <parent-form  lazy-validation :config="formConfig" >
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

              <v-row v-if="section.name === 'deal_details'" >
                <v-col class="col-12 col-md-4">
                  <form-field
                    :field="section.fields['accountManager']" :form="form" :form_name="form_name" outlined>
                  </form-field>
                  <form-field
                    :field="section.fields['name']" :form="form" :form_name="form_name" >
                  </form-field>
                  <form-field
                    :field="section.fields['region']" :form="form" :form_name="form_name" outlined>
                  </form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <form-field
                    :field="section.fields['dealStatus']" :form="form" :form_name="form_name" outlined>
                  </form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <date-picker v-bind="section.fields['renewal_date']" outlined>
                  </date-picker>
                  <form-field
                    :field="section.fields['reseller']" :form="form" :form_name="form_name" >
                  </form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'end_customer_information'" >
                <v-col class="col-12 col-md-4">
                  <form-field
                    :field="section.fields['contact']" :form="form" :form_name="form_name" outlined>
                  </form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'opportunity_information'" class="box" >
                <v-row>
                  <v-col class="col-12 col-md-4">
                    <form-field
                      :field="section.fields['opportunity_desc']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['budget']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['product']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <date-picker v-bind="section.fields['startDate']" outlined>
                    </date-picker>
                    <form-field
                      :field="section.fields['initiated_by']" :form="form" :form_name="form_name" >
                    </form-field>
                    <date-picker v-bind="section.fields['lastMeetingDate']" outlined>
                    </date-picker>
                    <v-yes-no-other v-bind="section.fields['technicalPresentationOption']">
                    </v-yes-no-other>
                    <form-field
                      :field="section.fields['quantity']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['competitors']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <form-field
                      :field="section.fields['otherOption']" :form="form" :form_name="form_name" >
                    </form-field>

                    <form-field
                      :field="section.fields['dealOS']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                    <form-field
                      :field="section.fields['notes']" :form="form" :form_name="form_name" outlined>
                    </form-field>
                  </v-col>
                </v-row>
                <span class="horizontal-line"></span>
              </v-row>

            </v-row>
          </div>
        </v-row>
      </template>
    </parent-form>
  </div>
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
  mixins: [ParentForm],
  data() {
    return {
      formConfig: {
        form_name : 'deal_view',
        form_url: this.axios.defaults.endpoints.deal.form,
        form_add: this.axios.defaults.endpoints.deal.add,
        form_edit: this.axios.defaults.endpoints.deal.edit,
        form_show: this.axios.defaults.endpoints.deal.show,
        disabled: false
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
