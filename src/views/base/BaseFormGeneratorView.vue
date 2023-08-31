<template>
  <v-form ref="form" lazy-validation style="padding-inline: 40px">
    <v-row class="mb-4 mt-4">
      <v-col class="text-left">
        <slot name="header-left">
          <slot name="header-left-pre-back"></slot>
          <btn-back-component :width="buttonWidth"></btn-back-component>
          <v-btn class="mr-4" color="primary" small elevation="0" @click="config.main_action_onsubmit">Save</v-btn>
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

      <div style="padding: 10px;font-weight: bold;color: #205023">
        <div v-if="section.label" class="mb-4">
          <p>{{ section.label }}</p>
        </div>
        <div v-if="section.description" class="mb-4">
          <h3>{{ section.description }}</h3>
        </div>
      </div>
      <form-section :section="section" :form_name="config.form_name" v-model="model"></form-section>
    </v-row>

  </v-form>
</template>

<script>
// import FormMixin from "@/mixins/FormMixin.js"
import eventBus from "@/eventBus";

import BtnBackComponent from "@/components/BtnBackComponent";
import FormSection from '@/components/FormSection.vue';

export default {
  components: {
    BtnBackComponent,
    FormSection
  },
  // mixins: [FormMixin],
  props: ['config'],
  computed: {
  },
  data() {
    return {
      buttonWidth: "30px",
      form:{},
      model: {
        name: '12',
        opportunities: {name:'aa'}
      },
      // baseForm: {
      //   id: '',
      //   date: '',
      //   saved: true,
      // },
      // model:{}
    };
  },
  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(this.config.form_url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.form = response.data.data
        eventBus.$emit('form-received', t.form);
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {
    // console.log(this)
  },
  methods: {

    submitForm(form, endpoint, t, formRef) {

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
