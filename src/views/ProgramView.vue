<template>
  <div class="container">
    <parent-form  lazy-validation :config="formConfig" ref="formRef" v-model="model" >
      <template v-slot:header-left-post-back>
        <v-btn class="mr-4" color="primary" small elevation="0">Add a deal</v-btn>
<!--        <v-btn class="mr-4" color="primary" small elevation="0" @click="submitForm">Save</v-btn>-->
      </template>
    </parent-form>
  </div>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import eventBus from '@/eventBus.js';
import ComponentMapper from "@/components/ComponentMapper";
import DealStatuses from "@/components/DealStatuses";
import VYesNoOther from "@/components/VYesNoOther";

export default {
  components: {
    ParentForm
  },
  mixins: [ParentForm],
  data() {
    return {
      response : [],
      model: {},
      formConfig: {
        form_name : 'program_view',
        form_url: this.axios.defaults.endpoints.deal.form,
        form_action: this.axios.defaults.endpoints.deal.add,
        main_action_onsubmit:this.submitForm,
      }
    };
  },
  created() {
    ComponentMapper.addMapping('program_view|dealStatus',{'component': DealStatuses})
    ComponentMapper.addMapping('program_view|technicalPresentationOption',{'component': VYesNoOther})
  },
  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(this.axios.defaults.endpoints.deal_form.url, {})
      .then(function (response) {
        t.$Progress.finish()
        console.log(response.data.data)
        t.response = response.data.data
        t.sendForm()
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    sendForm(){
      console.log(this.response)
      eventBus.$emit('form-received', this.response);
    },
    submitForm() {
      var endpoint = ""
      const t = this
      if (!t.baseForm.id)
        endpoint = this.axios.defaults.endpoints.deal_add.url
      else
        endpoint = this.axios.defaults.endpoints.deal_edit.url+t.deal.id

      ParentForm.methods.submitForm(this.response,endpoint,t,this.$refs);
    },
  },
};
</script>
