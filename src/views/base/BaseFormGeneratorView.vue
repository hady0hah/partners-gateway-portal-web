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
    <v-row class="mb-4">
      <h3>{{ form.title }}</h3>
    </v-row>
    <v-row class="mb-4">
      <p style="font-size: smaller;">{{ form.description }}</p>
    </v-row>
    <v-row class="box mt-15" v-for="section, i in form.form" :key="i">
      <div>
        <div v-if="section.label" class="mb-4" >
          <p>{{ section.label }}</p>
        </div>
        <div v-if="section.description" class="mb-4">
          <h3>{{ section.description }}</h3>
        </div>
      </div>
      <v-row class="box">
      <v-col v-for="field in section.fields" :key="field.name" class="col-12 col-md-4">
<!--        <component v-if="field.name === 'region'" :is="getFieldComponent(field.type)" :items="Regions" outlined
          item-text="name" item-value="id" v-bind="fieldProps(field)" v-model="region.id" v-on:change="valueChange()"></component>

        <component v-else-if="field.name === 'countries'" :is="getFieldComponent(field.type)" :items="Countries"
          item-text="name" item-value="id" v-bind="fieldProps(field)" v-model="baseForm['country.id']"
          v-on:change="countryChange()" label="Select Country"></component>

        <component v-else-if="field.name === 'cities'" :is="getFieldComponent(field.type)" :items="cities"
          item-text="name" item-value="id" v-bind="fieldProps(field)" v-model="baseForm['city.id']"
          v-on:change="valueChange()" label="City" ></component>


        <v-row v-if="field.name === 'lastMeetingDate' || field.name === 'startDate' ">
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="baseForm[field.name]"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="getFieldProps(field)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="baseForm[field.name]"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-row>


          <v-row v-else-if="field.name === 'status' || field.name === 'dealStatus' ">
            <v-col cols="9">
              <component :is="getFieldComponent(field.type)" :items="Statuses" item-text="label" item-value="id" outlined
                v-bind="fieldProps(field)" v-model="status.id" v-on:change="statusChange()"></component>

            </v-col>
          </v-row>
-->

        <component 
            :is="getFieldComponent(field)" 
            v-bind="getFieldProps(field)" 
            v-model="form[field.name]" 
            v-on:change="valueChange()">
        </component>

      </v-col>
    </v-row>
    </v-row>

  </v-form>
</template>

<script>
import eventBus from '@/eventBus.js';

import { mapActions, mapGetters } from "vuex";
import BtnBackComponent from "@/components/BtnBackComponent";

import ComponentMapper from "@/components/ComponentMapper";

export default {
  components: {
    BtnBackComponent,
  },
  props: ['id','main_action_onsubmit'],
  computed: {
    ...mapGetters({
      // MdfStatuses: "StateMdfStatuses",
      Countries: "StateCountries",
      Statuses: "StateStatuses",
      Regions: "StateRegions",
    }),
    // combinedLabel() {
    //   return (item) =>  `"<img src='${item.imageFile}' alt='Image' width='20' height='20' />" ${item.label}`;
    //   // const imageFile = (item) => `${item.imageFile}`;
    //   // return (item) => `${item.id} - ${item.label}`;
    //     // return (item) => `${item.name} - ${item.country}`;
    //
    // },
  },
  data() {
    return {
      buttonWidth: "30px",
      form: {},
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
  created() {
    eventBus.$on('form-received', this.handleFormReceived);
  },
  destroyed() {
    eventBus.$off('form-received', this.handleFormReceived);
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
    getFieldComponent(field) {
      return ComponentMapper.mapType(field)
    },
    getFieldProps(field) {
      return ComponentMapper.mapProps(field)
    },
    handleFormReceived(form) {
      this.form = form
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
