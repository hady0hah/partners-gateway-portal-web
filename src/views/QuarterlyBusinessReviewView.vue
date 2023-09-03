<template>
  <div class="container">
    <parent-form  lazy-validation ref="formRef" :config="formConfig">
      <template v-slot:header-left-post-back>
        <v-btn class="mr-4" color="primary" small elevation="0">Add a deal</v-btn>
        <!--        <v-btn class="mr-4" color="primary" small elevation="0" @click="submitForm">Save</v-btn>-->
      </template>
    </parent-form>
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
  // mixins: [ParentForm],
  data() {
    return {
      response : [],
      formConfig: {
        form_name : 'QBR_view',
        form_url: this.axios.defaults.endpoints.qbr.form,
        form_action: this.axios.defaults.endpoints.qbr.add,
        main_action_onsubmit:this.submitForm,
      }
    };
  },
  created() {
    ComponentMapper.addMapping('QBR_view|opportunities',{'component': VQBRForm})
    // ComponentMapper.addMapping('QBR_view|name',{'component': VCollectionNameField})
  },
  mounted() {
    // const t = this
    // this.$Progress.start()
    // this.axios.get(axios.defaults.endpoints.qbr_form.url, {})
    //   .then(function (response) {
    //     t.$Progress.finish()
    //     t.response = response.data.data
    //     t.sendForm()
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  methods: {
    sendForm(){
      // eventBus.$emit('form-received', this.response);
    },
    submitForm() {
      console.log(this.$refs)
      // var endpoint = ""
      // const t = this
      // if (!t.baseForm.id)
      //   endpoint = axios.defaults.endpoints.deal_add.url
      // else
      //   endpoint = axios.defaults.endpoints.deal_edit.url+t.deal.id

      // ParentForm.methods.submitForm(this.response,endpoint,t,this.$refs);
    },
  },
};
</script>
