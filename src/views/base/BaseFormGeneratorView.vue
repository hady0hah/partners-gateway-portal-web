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



    <v-row class="box mt-15" v-for="section, i in form.sections" :key="i">

      <div>
        <div v-if="section.title" class="mb-4" >
          <p>{{ section.title }}</p>
        </div>
        <div v-if="section.description" class="mb-4">
          <h3>{{ section.description }}</h3>
        </div>
      </div>

      <v-row class="box">
      <v-col v-for="field in section.fields" :key="field.name" class="col-12 col-md-4">

        <component v-if="field.name === 'region'" :is="getFieldComponent(field.type)" :items="Regions"
          item-text="label" item-value="id" v-bind="fieldProps(field)" v-model="region.id" v-on:change="valueChange()"
          label="Region"></component>

        <component v-else-if="field.name === 'countries'" :is="getFieldComponent(field.type)" :items="Countries"
          item-text="label" item-value="id" v-bind="fieldProps(field)" v-model="baseForm['country.id']"
          v-on:change="countryChange()" label="Select Country"></component>

        <component v-else-if="field.name === 'cities'" :is="getFieldComponent(field.type)" :items="cities"
          item-text="label" item-value="id" v-bind="fieldProps(field)" v-model="baseForm['city.id']"
          v-on:change="valueChange()" label="City" ></component>

        <component
          v-else-if="field.name === 'date'"
          :is="getFieldComponent(field.type)" v-bind="fieldProps(field)" v-model="baseForm['date']"
          v-on:change="valueChange()"></component>

        <v-card v-else-if="field.name === 'status'" elevation="2" shaped class="pa-4">
          <v-row>
            <v-col cols="2">
              <v-img v-if="status && field.name === 'status'" :src="status.icon"></v-img>
            </v-col>
            <v-col cols="9">
              <component :is="getFieldComponent(field.type)" :items="Statuses" item-text="label" item-value="id"
                v-bind="fieldProps(field)" v-model="status.id" v-on:change="statusChange()"></component>

            </v-col>
          </v-row>
        </v-card>

        <component
          v-else
          :is="getFieldComponent(field.type)" v-bind="fieldProps(field)" v-model="form[field.name]"
          v-on:change="valueChange()"></component>

      </v-col>
    </v-row>
    </v-row>

  </v-form>
</template>

<script>
import eventBus from '@/eventBus.js';

import { VTextField } from 'vuetify/lib';
import { VDatePicker } from 'vuetify/lib';
import { VSelect } from 'vuetify/lib';
import { VTextarea } from 'vuetify/lib';

import { mapActions, mapGetters } from "vuex";
import BtnBackComponent from "@/components/BtnBackComponent";

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
    })
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
      if (field.required) {
        var required = [v => !!v || 'Field is required'];
      }
      return {
        label: field.label,
        rules: required,
      };
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
