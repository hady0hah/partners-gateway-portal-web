<template>
  <v-form v-if="!loading" ref="baseform" lazy-validation :disabled="config.disabled">
    <v-row>
      <v-col class="text-left">
        <slot name="header-left">
          <slot name="header-left-pre-back"></slot>
          <slot name="header-back"><btn-back-component :width="buttonWidth"></btn-back-component></slot>
          <v-btn v-if="!config.disabled" class="mr-4" color="primary" small elevation="0"
            @click="() => { config.main_action_onsubmit ? config.main_action_onsubmit() : submitForm(false) }">Save</v-btn>
          <slot name="header-left-post-back">
            <v-btn v-if="config.display_submit_button && !config.disabled && objectid" class="mr-4" color="primary"
              @click="submitForm(true)" small elevation="0">Submit</v-btn>
          </slot>
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
      <v-col v-if="form.title" class="col-12">
        <h3>{{ form.title }}</h3>
      </v-col>
      <v-col v-if="form.description" class="mb-4 col-12" style="color: #205023;font-size: smaller;">
        <div v-html="form.description"></div>
      </v-col>
      <form-errors :errors="form_errors.global"></form-errors>
      <slot name="form-sections" v-bind:form="form" v-bind:error-messages="form_errors.fields">
        <v-col class="box col-12" v-for="section, i in form.form" :key="i">
          <form-section :section="section" :form_name="config.form_name" v-model="model" :disabled="config.disabled"
            :error-messages="form_errors.fields"></form-section>
        </v-col>
      </slot>
    </v-row>

  </v-form>
</template>

<script>
// import FormMixin from "@/mixins/FormMixin.js"
import eventBus from "@/eventBus";

import BtnBackComponent from "@/components/BtnBackComponent";
import FormSection from '@/components/FormSection.vue';
import FormErrors from "@/components/FormErrors.vue";

export default {
  components: {
    BtnBackComponent,
    FormSection,
    FormErrors
  },
  // mixins: [FormMixin],
  props: {
    config: {
      default: () => {
        return {
          form_name: null,
          form_fields: null,
          form_url: null,
          form_add: null,
          form_edit: null,
          form_data: null,
          form_submit: null,
          main_action_onsubmit: null,
          display_submit_button: false,
          disabled: null,
          isDialog: false,
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
      form: {},
      model: {},
      form_errors: {},
      loading: false
    };
  },
  created() {
    this.objectid = this.$route.params.id ? this.$route.params.id : null
    if (this.config.form_fields) {
      this.form = this.config.form_fields
      return
    }
    if (!this.config.form_url) return
    this.loading = true
    this.$Progress.start()
    const t = this
    this.axios.get(this.config.form_url, {})
      .then(function (response) {
        t.form = response.data.data
        eventBus.$emit('form-received', t.form);
        if (t.objectid && !t.config.isDialog) {
          const formData = t.axios.defaults.endpoints.resolve(t.config.form_data, { id: t.objectid })
          t.axios.get(formData, {})
            .then(function (response) {
              t.model = response.data.data
              t.config.disabled = !response.data.data.isEditable
              t.loading = false
              eventBus.$emit('data-received', t.model);
              t.$Progress.finish()
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          t.loading = false
          t.$Progress.finish()
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submitForm(isSubmit) {
      const form = this.$refs.baseform

      if (!form.validate())
        return

      const t = this
      let formUrl = null
      if (t.objectid) {
        formUrl = this.axios.defaults.endpoints.resolve(this.config.form_edit, { id: t.objectid })
      } else {
        formUrl = this.config.form_add
      }

      const formdata = new FormData(form.$el)
      this.$Progress.increase(10)
      this.axios.post(formUrl, formdata)
        .then(function (response) {
          t.$Progress.finish()
          if (response.data.success == false) {
            t.form_errors = response.data.errors
            return
          } else {
            if (isSubmit) {
              formUrl = t.axios.defaults.endpoints.resolve(t.config.form_submit, { id: t.objectid })
              t.axios.post(formUrl)
                .then(function (response) {
                  if (response.data.success == false) {
                    t.form_errors = response.data.errors
                    return
                  } else {
                    eventBus.$emit('form-submitted', response.data.data);
                    if (!t.config.isDialog) {
                      t.$router.go(-1);
                    }
                  }
                })
            } else {
              eventBus.$emit('form-submitted', response.data.data);
              if (!t.config.isDialog) {
                t.$router.go(-1);
              }
            }
          }
          // t.$root.$emit('refreshClientProfile') ??
        })
        .catch(err => {
          alert("Please review your inputs and try again !")
          console.log(err);
        });
    }
  }
};
</script>
