<template>
  <div>
    <parent-form @click="submitForm">
      <template v-slot:header-left-post-back>
        <v-btn class="mr-4" color="primary" small elevation="0">Add a deal</v-btn>
      </template>
    </parent-form>
  </div>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import eventBus from '@/eventBus.js';

export default {
  components: {
    ParentForm
  },
  mixins: [ParentForm],
  data() {
    return {
      response: null,
    };
  },
  created() {
    const t = this
    this.$Progress.start()
    this.axios.get('private/mdf/list', {})
      .then(function (response) {
        t.response = response.data.data
        console.log(response)
        console.log(this.response)
        t.$Progress.finish()
          })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    const dataToSend = this.response;
    eventBus.$emit('form-received', dataToSend);
  },
  methods: {
    submitForm() {
    },
  },
};
</script>
