<template>
  <v-form ref="form" lazy-validation style="margin-inline: 40px">

    <v-col style="margin-top: 30px" >
      <v-row class="mb-4">
        <v-btn class="mr-4" color="primary" @click="back" small elevation="0">Back</v-btn>
        <slot></slot>
      </v-row>
    </v-col >

    <v-col class="col-12">
      <v-row class="mb-4">
        <h3>{{ response.title }}</h3>
      </v-row>

      <v-row class="mb-4">
        <p style="font-size: smaller;">{{ response.description }}</p>
      </v-row >
    </v-col>

    <v-row class="box">

      <v-col class="col-12">
        <v-row>
          <v-col v-for="field in formFields" :key="field.name" class="col-12 col-md-4">
            <component v-if="field.name !== 'countries' && field.name !== 'cities' && field.name !== 'status' && field.name !== 'region'"  :is="getFieldComponent(field.type)"
                       v-bind="fieldProps(field)"
                       v-model="form[field.name]"
                       v-on:change="valueChange()"
            ></component>
            <component v-if="field.name === 'region'" :is="getFieldComponent(field.type)"
                       :items="Regions"
                       item-text="label"
                       item-value="id"
                       v-bind="fieldProps(field)"
                       v-model="region.id"
                       v-on:change="valueChange()"
                       label="Region"
            ></component>
            <component v-if="field.name === 'countries'" :is="getFieldComponent(field.type)"
                       :items="Countries"
                       item-text="label"
                       item-value="id"
                       v-bind="fieldProps(field)"
                       v-model="baseForm['country.id']"
                       v-on:change="countryChange()"
                       label="Select Country"
            ></component>

            <component v-if="field.name === 'cities'" :is="getFieldComponent(field.type)"
                       :items="cities"
                       item-text="label"
                       item-value="id"
                       v-bind="fieldProps(field)"
                       v-model="baseForm['city.id']"
                       v-on:change="valueChange()"
                       label="City"
            ></component>

            <v-col v-if=" field.name === 'status'" >
              <v-card elevation="2" shaped class="pa-4">
                <v-row>
                  <v-col cols="2">
                    <v-img v-if="dealStatus && field.name === 'status'" :src="dealStatus.icon"></v-img>
                  </v-col>
                  <v-col cols="9">
                      <component v-if="field.name === 'status'" :is="getFieldComponent(field.type)"
                                 :items="Statuses"
                                 item-text="label"
                                 item-value="id"
                                 v-bind="fieldProps(field)"
                                 v-model="dealStatus.id"
                                 v-on:change="dealStatusChange()"
                      ></component>

                  </v-col>
                </v-row>
              </v-card>
            </v-col>

          </v-col>
        </v-row>
      </v-col>
    </v-row>


    <v-row class="box mt-15">

    </v-row>

  </v-form>
</template>

<script>
import FormGenerator from '../formGenerator.js';
import eventBus from '../eventBus.js';

import { VTextField } from 'vuetify/lib';
import { VDatePicker } from 'vuetify/lib';
import { VSelect } from 'vuetify/lib';
import { VTextarea }  from 'vuetify/lib';

import {mapActions, mapGetters} from "vuex";

export default {
  props: ['id'],
  computed: {
    ...mapGetters({
      MdfStatuses: "StateMdfStatuses",
      Countries: "StateCountries",
      Statuses: "StateStatuses",
      Regions: "StateRegions",
    })},
  data() {
    return {
      response:{},
      formFields: [],
      form: {},
      dealStatus: {},
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
    ...mapActions(["StateSetCountries", "StateSetMdfStatuses"]),
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
    dealStatusChange () {
      this.dealStatus = Object.assign({}, this.Statuses.find(status => status.id === this.dealStatus.id))
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
    back() {
      this.$router.push("/");
    },
  }
};
</script>
