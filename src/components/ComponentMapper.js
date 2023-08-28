import map from "./ComponentMap";

class ComponentMapper {
  static mapType(field) {
    return map[field.type].component
  }
  static mapProps(field) {
    if (field.required) {
      var required = [v => !!v || 'Field is required'];
    }
    
    return {
      label: field.label,
      rules: required,
      hint: field.sonata_help
    };
  }
}

export default ComponentMapper;

