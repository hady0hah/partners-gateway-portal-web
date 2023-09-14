<template>
  <div class="container">
    <parent-form  lazy-validation ref="formRef" :config="formConfig"></parent-form>
  </div>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import ComponentMapper from "@/components/ComponentMapper";
import VQBRForm from "@/components/VQBRForm";

export default {
  components: {
    ParentForm
  },
  data() {
    return {
      formConfig: {
        form_name : 'QBR_view',
        form_url: this.axios.defaults.endpoints.qbr.form,
        form_add: this.axios.defaults.endpoints.qbr.add,
        form_data: this.axios.defaults.endpoints.qbr.show,
        disabled: false
      }
    };
  },
  created() {
    ComponentMapper.addMapping('QBR_view|opportunities',{'component': VQBRForm})
    this.objectid = this.$route.params.id?this.$route.params.id:null
    if(this.objectid) {
      this.formConfig.form_data = this.axios.defaults.endpoints.resolve(this.formConfig.form_data, { id: this.objectid })
      this.formConfig.disabled = true
    }
  },
  mounted() {
  },
  methods: {
  },
};
</script>
