import eventBus from "@/eventBus";
export default {
    created() {
      eventBus.$on('form-received', this.handleFormReceived);
    },
    destroyed() {
      eventBus.$off('form-received', this.handleFormReceived);
    },
    data() {
      return {
        form: {},
      }
    },
    methods: {
        handleFormReceived(form) {
          this.form = form
        }
    }
}