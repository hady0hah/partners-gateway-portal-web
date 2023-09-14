import eventBus from "@/eventBus";
export default {
  created() {
    eventBus.$on('contact-submitted', this.handleContactReceived);
  },
  destroyed() {
    eventBus.$off('contact-submitted', this.handleContactReceived);
  },
  data() {
    return {
      contact:{},
    }
  },
  methods: {
    handleContactReceived(data) {
      this.contact = data
      // console.log(this.$refs.formRef)
      // console.log(this.$refs.formRef.form.form[1].fields['contact']['choices'])
      // this.$refs.formRef.form.form[1].fields['contact']['choices'].push({ data });
      // console.log(this.$refs.formRef.form.form[1].fields['contact']['choices'])
      // console.log(data)
      // console.log(this.$refs.formRef)

    },
  }
}
