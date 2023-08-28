import map from "./ComponentMap";

class ComponentMapper {
  static addMapping(fieldRef, component) {
    map[fieldRef] = component
  }
  static mapType(field, formName) {
    let fullFieldName = formName + "|" + field.name
    if (fullFieldName in map) {
      return map[fullFieldName]
    } else if (field.name in map) {
      return map[field.name]
    } else {
      return map[field.type].component
    }
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

