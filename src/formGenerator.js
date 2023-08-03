class FormGenerator {
  static generateForm(response) {
    const formFields = response['0'].form_field;

    return {
      formFields,
      form: formFields.reduce((form, field) => {
        form[field.name] = '';
        return form;
      }, {}),
    };
  }
}

export default FormGenerator;

