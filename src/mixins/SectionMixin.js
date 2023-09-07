export default {
    methods: {
      getFieldValue(field) {
        if(!this.$attrs.value)
          this.$attrs.value = {}
        if(!(field.name in this.$attrs.value))
          this.$attrs.value[field.name] = null
        return this.$attrs.value[field.name]
      },
      onInput(field, $event) {
        this.$attrs.value[field.name] = $event
        this.$emit('input', this.$attrs.value)
      }
    }
}
