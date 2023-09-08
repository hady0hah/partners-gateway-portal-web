import eventBus from "@/eventBus";
export default {
    created() {
      eventBus.$on('form-received', this.handleFormReceived);
      eventBus.$on('data-received', this.handleDataReceived);
    },
    destroyed() {
      eventBus.$off('form-received', this.handleFormReceived);
      eventBus.$off('data-received', this.handleDataReceived);
    },
    data() {
      return {
        form: {},
        model:{}
      }
    },
    methods: {
        handleFormReceived(form) {
          this.form = form
        },
        handleDataReceived(data) {
          this.model = data
        }
    }
}