<template>
  <v-form ref="form" lazy-validation style="margin-inline: 40px" >
    <v-row class="mb-4" style="margin-top: 30px">
      <v-col class="text-left">
        <slot name="header-left">
          <slot name="header-left-pre-back" ></slot>
          <btn-back-component :width="buttonWidth"></btn-back-component>
            <v-btn class="mr-4" color="primary" small elevation="0" @click="main_action_onsubmit">Save</v-btn>
          <slot name="header-left-post-back"></slot>
        </slot>
      </v-col>
      <v-col class="text-center">
        <slot name="header-center"></slot>
      </v-col>
      <v-col class="text-right">
        <slot name="header-right"></slot>
      </v-col>
    </v-row>

    <v-row class="mb-4" style="color: #205023">
      <h3>{{ form.title }}</h3>
    </v-row>

    <v-row class="mb-4" style="color: #205023;font-size: smaller;">
      <div v-html="form.description"></div>
    </v-row>

    <v-row class="box mt-15" v-for="section, i in form.form" :key="i">

      <div class="container">
        <div v-if="section.label" class="mb-4" style="padding: 10px;font-weight: bold;color: #205023" >
          <p>{{ section.label }}</p>
        </div>
        <div v-if="section.description" class="mb-4">
          <h3>{{ section.description }}</h3>
        </div>
        <form-section :section="section" :form_name="form_name"></form-section>
      </div>
    </v-row>

  </v-form>
</template>

<script>
import FormMixin from "@/mixins/FormMixin.js"

import { mapActions, mapGetters } from "vuex";
import BtnBackComponent from "@/components/BtnBackComponent";
import FormSection from '@/components/FormSection.vue';

export default {
  components: {
    BtnBackComponent,
    FormSection
  },
  mixins : [FormMixin],
  props: ['id','main_action_onsubmit', 'form_name'],
  computed: {
    ...mapGetters({
      // MdfStatuses: "StateMdfStatuses",
      Countries: "StateCountries",
      Statuses: "StateStatuses",
      Regions: "StateRegions",
    }),
  },
  data() {
    return {
      buttonWidth: "30px",
      status: {},
      region: {},
      statuses: [],
      cities: [],
      baseForm: {
        id: '',
        date:'',
        saved: true,
      },
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions(["StateSetCountries"]),
    countryChange() {
      const t = this
      this.axios.get('private/country/show?id=' + this.baseForm['country.id'], {})
        .then(function (response) {
          t.$Progress.finish()
          t.cities = response.data.data.cities
        })
        .catch(err => {
          console.log(err);
        });
      this.saved = false
    },
    statusChange() {
      this.status = Object.assign({}, this.Statuses.find(status => status.id === this.status.id))
    },
    valueChange() {
      this.saved = false
    },
    submitForm(form,endpoint,t,formRef){

      if (!formRef.formRef.$refs.form.validate())
        return;

      const formData = new FormData();

      const fieldMapping = {
        'region': t.region.id,
        'countries': t.baseForm['country.id'],
        'cities': t.baseForm['city.id'],
        'status': t.status.id,
        'date': t.baseForm['date'],
      };

      form.sections.forEach(section => {
        section.fields.forEach(field => {
          const fieldValue = fieldMapping[field.name] || field.name;
          formData.append(`form[${field.name}]`, fieldValue);
        });
      });

          t.$Progress.increase(10)
          t.axios.post(endpoint, formData)
            .then(function (response) {
              t.$Progress.finish()
              t.deal = response.data.data
              t.$root.$emit('refreshClientProfile')
            })
        .catch(err => {
          console.log(err);
        });


    }
  }
};
</script>
