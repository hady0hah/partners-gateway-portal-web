<template>
  <v-form ref="form" lazy-validation style="margin-inline: 40px">

<!--    <v-col style="margin-top: 30px" >-->
      <v-row class="mb-4" style="margin-top: 30px" >
        <btn-back-component :width="buttonWidth"></btn-back-component>
        <slot></slot>
      </v-row>
<!--    </v-col >-->

<!--    <v-col class="col-12">-->
      <v-row class="mb-4">
        <h3>{{ response.title }}</h3>
      </v-row>

      <v-row class="mb-4">
        <p style="font-size: smaller;">{{ response.description }}</p>
      </v-row >
<!--    </v-col>-->

    <v-row class="box">

      <v-col class="col-12">
        <v-row>
          <v-col v-for="field in formFields" :key="field.name" class="col-12 col-md-4">
            <component v-if="field.name !== 'countries' && field.name !== 'cities' && field.name !== 'status' && field.name !== 'region'"  :is="getFieldComponent(field.type)"
                       v-bind="fieldProps(field)"
                       v-model="form[field.name]"
                       v-on:change="valueChange()"
            ></component>
            <component v-else-if="field.name === 'region'" :is="getFieldComponent(field.type)"
                       :items="Regions"
                       item-text="label"
                       item-value="id"
                       v-bind="fieldProps(field)"
                       v-model="region.id"
                       v-on:change="valueChange()"
                       label="Region"
            ></component>
            <component v-else-if="field.name === 'countries'" :is="getFieldComponent(field.type)"
                       :items="Countries"
                       item-text="label"
                       item-value="id"
                       v-bind="fieldProps(field)"
                       v-model="baseForm['country.id']"
                       v-on:change="countryChange()"
                       label="Select Country"
            ></component>

            <component v-else-if="field.name === 'cities'" :is="getFieldComponent(field.type)"
                       :items="cities"
                       item-text="label"
                       item-value="id"
                       v-bind="fieldProps(field)"
                       v-model="baseForm['city.id']"
                       v-on:change="valueChange()"
                       label="City"
            ></component>

<!--            <v-row v-else-if=" field.name === 'status'" >-->
              <v-card v-else-if=" field.name === 'status'" elevation="2" shaped class="pa-4">
                <v-row>
                  <v-col cols="2">
                    <v-img v-if="status && field.name === 'status'" :src="status.icon"></v-img>
                  </v-col>
                  <v-col cols="9">
                      <component :is="getFieldComponent(field.type)"
                                 :items="Statuses"
                                 item-text="label"
                                 item-value="id"
                                 v-bind="fieldProps(field)"
                                 v-model="status.id"
                                 v-on:change="statusChange()"
                      ></component>

                  </v-col>
                </v-row>
              </v-card>
<!--            </v-row>-->

          </v-col>
        </v-row>
      </v-col>
    </v-row>


  </v-form>
</template>

<script>
import FormGenerator from '../formGenerator.js';
import eventBus from '../eventBus.js';
import backBtn from '../components/BtnBackComponent.vue'

import { VTextField } from 'vuetify/lib';
import { VDatePicker } from 'vuetify/lib';
import { VSelect } from 'vuetify/lib';
import { VTextarea }  from 'vuetify/lib';

import {mapActions, mapGetters} from "vuex";
import BtnBackComponent from "../components/BtnBackComponent";

export default {
  components: {
    BtnBackComponent,
    backBtn
  },
  props: ['id'],
  computed: {
    ...mapGetters({
      // MdfStatuses: "StateMdfStatuses",
      Countries: "StateCountries",
      Statuses: "StateStatuses",
      Regions: "StateRegions",
    })},
  data() {
    return {
      buttonWidth: "30px",
      response:{},
      formFields: [],
      form: {},
      status: {},
      region: {},
      statuses: [],
      cities: [],
      baseForm:{
        id: '',
        saved : true,
      },
    };
  },
  mounted() {

  },
  created() {
    eventBus.$on('data-received', this.handleDataReceived);
  },
  destroyed() {
    eventBus.$off('data-received', this.handleDataReceived);
  },
  methods: {
    ...mapActions(["StateSetCountries"]),
    countryChange () {
      const t = this
      this.axios.get('private/country/show?id='+this.baseForm['country.id'], {})
        .then(function (response) {
          t.$Progress.finish()
          t.cities = response.data.data.cities
        })
        .catch(err => {
          console.log(err);
        });
      this.saved = false
    },
    statusChange () {
      this.status = Object.assign({}, this.Statuses.find(status => status.id === this.status.id))
    },
    getFieldComponent(type) {
      const fieldComponents = {
        'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType': VTextField,
        'Symfony\\Component\\Form\\Extension\\Core\\Type\\DateType': VDatePicker,
        'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType': VSelect,
        'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextAreaType': VTextarea,
      };
      return fieldComponents[type] || 'VTextField';
    },
    fieldProps(field) {
      if(field.required){
        var required = [v => !!v || 'Field is required'];
      }
      return {
        label: field.label,
        rules: required,
      };
    },
    handleDataReceived(data) {
      this.response = data;
      const { formFields, form } = FormGenerator.generateForm(this.response);
      this.formFields = formFields;
      this.form = form;
    },
    valueChange() {
      this.saved = false
    },
  }
};
</script>
