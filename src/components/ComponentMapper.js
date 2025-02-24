import map from "./ComponentMap";

class ComponentMapper {
  static addMapping(fieldRef, component) {
    map[fieldRef] = component
  }
  static mapType(field, formName) {
    let fullFieldName = formName + "|" + field.name
    if (fullFieldName in map) {
      return map[fullFieldName].component
    } else if (field.name in map) {
      return map[field.name].component
    } else {
      return map[field.type].component
    }
  }
  static mapProps(field) {
    if (field.required) {
      var required = [v => !!v || 'Field is required'];
    }
    if(field.choices){
     var choices = ComponentMapper.parseChoices(field.choices)
    }
    if(field.sonata_help)
      var persistentHint = 'persistent-hint';
    return {
      label: field.label,
      rules: required,
      hint: field.sonata_help,
      persistentHint: persistentHint,
      disabled: field.disabled,
      items:  choices,
      fields: field.fields,
      name: field.full_name,
      required: field.required,
      multiple: field.multiple
    };
  }

  static parseChoices(items)
  {
   return  Object.values(items).map(item => ({
      "value": item.value,
      "label": item.label,
      "icon": item.icon,
    }));
  }
}

export default ComponentMapper;

