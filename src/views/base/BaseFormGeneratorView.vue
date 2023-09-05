<template>
  <v-form ref="baseform" lazy-validation :disabled="config.disabled">
    <v-row >
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
      <v-col class="col-12">
        <h3>{{ form.title }}</h3>
      </v-col>
      <v-col class="mb-4 col-12" style="color: #205023;font-size: smaller;">
        <div v-html="form.description"></div>
      </v-col>

      <v-col class="box col-12" v-for="section, i in form.form" :key="i">
        <form-section :section="section" :form_name="config.form_name" v-model="model"></form-section>
      </v-col>
    </v-row>
    <code>
      {{ model }}
    </code>
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
  props: {
    config: {
      default: () =>{
        return {
          form_name : null,
          form_url: null,
          form_action: null,
          main_action_onsubmit:null,
          disabled: false
        }
      },
      type: Object
    }
  },
  computed: {
  },
  data() {
    return {
      objectid: null,
      buttonWidth: "30px",
      form:{},
      model: {},
    };
  },
  mounted() {
    if(!this.config.form_url) return
    const t = this
    this.$Progress.start()
    this.axios.get(this.config.form_url, {})
      .then(function (response) {
        t.form = response.data.data
        eventBus.$emit('form-received', t.form);
        if(t.objectid){
          t.axios.get(t.config.form_data, {})
            .then(function (response) {
              t.model = response.data.data
              eventBus.$emit('data-received', t.model);
              t.$Progress.finish()
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          t.$Progress.finish()
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {
    this.disabled = this.$route.params.disabled
    this.objectid = this.$route.params.id?this.$route.params.id:null
    
  },
  methods: {
    submitForm() {
      const form = this.$refs.baseform

      // if (!form.validate())
      //   return

      const t = this
      const formdata = new FormData(form.$el)
      this.$Progress.increase(10)
      this.axios.post(this.config.form_action,formdata)
        .then(function (response) {
          t.$Progress.finish()
          console.log(response)
          eventBus.$emit('form-submitted', t.form);
          // t.$root.$emit('refreshClientProfile') ??
        })
        .catch(err => {
          console.log(err);
        });
      

      // if (!formRef.formRef.$refs.form.validate())
      //   return;

      // const formData = new FormData();

      // const fieldMapping = {
      //   'region': t.region.id,
      //   'countries': t.baseForm['country.id'],
      //   'cities': t.baseForm['city.id'],
      //   'status': t.status.id,
      //   'date': t.baseForm['date'],
      // };

      // form.sections.forEach(section => {
      //   section.fields.forEach(field => {
      //     const fieldValue = fieldMapping[field.name] || field.name;
      //     formData.append(`form[${field.name}]`, fieldValue);
      //   });
      // });

      // t.$Progress.increase(10)
      // t.axios.post(endpoint, formData)
      //   .then(function (response) {
      //     t.$Progress.finish()
      //     t.deal = response.data.data
      //     t.$root.$emit('refreshClientProfile')
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });


    }
  }
};
</script>
