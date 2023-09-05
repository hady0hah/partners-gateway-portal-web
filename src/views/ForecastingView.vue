<template>
  <div class="container">
    <parent-form lazy-validation :config="formConfig" ref="formRef"></parent-form>
  </div>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import ComponentMapper from "@/components/ComponentMapper";
import VForecastingForm from "@/components/VForecastingForm";

export default {
  components: {
    ParentForm
  },
  mixins: [ParentForm],
  data() {
    return {
      objectid: null,
      formConfig: {
        form_name : 'forecasting_view',
        form_url: this.axios.defaults.endpoints.forecasting.form,
        form_action: this.axios.defaults.endpoints.forecasting.add,
        form_data: this.axios.defaults.endpoints.forecasting.show,
        main_action_onsubmit:this.submitForm,
      }
    };
  },
  created() {
    ComponentMapper.addMapping('forecasting_view|opportunities',{'component': VForecastingForm})
    this.objectid = this.$route.params.id?this.$route.params.id:null
    if(this.objectid) {
      this.formConfig.form_data = this.axios.defaults.endpoints.resolve(this.formConfig.form_data, { id: this.objectid })
    }
  },
  mounted() {
  },
  methods: {
  },
};
</script>
