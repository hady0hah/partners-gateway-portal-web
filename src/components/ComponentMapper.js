import map from "./ComponentMap";

class ComponentMapper {
  static addMapping(fieldRef, component) {
    map[fieldRef] = component
  }
  static mapType(field, formName) {
    let fullFieldName = formName + "|" + field.name
    console.log(fullFieldName)
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

    return {
      label: field.label,
      rules: required,
      hint: field.sonata_help,
      disabled: field.disabled,
      items:  choices,
      fields: field.fields,
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

