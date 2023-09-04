export default {
    methods: {
      updateFields(fields, index) {
        let _fields = {}
        for (const [key, item] of Object.entries(fields)) {
          _fields[key] = this.updateField(item, index)
        }
        return _fields
      },
      updateField(field, index) {
        let _field = Object.assign({}, field)
        _field.full_name = field.full_name.replace('__name__', index)
        return _field
      }
    }
}