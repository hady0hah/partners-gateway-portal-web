<template>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
          small
          elevation="0"
        >
          Add New Customer
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
  <parent-form  lazy-validation :config="formConfig" ref="formRef">
    <template v-slot:header-left>
    <span></span>
    </template>
    <template v-slot:form-sections>
      <v-row class="box" v-for="(section, i) in formConfig.contact_form_fields.form" :key="i">
          <v-col class="col-12 col-md-4">
          <form-field :field="section.fields['name']" :form_name="formConfig.form_name"
                      v-bind:value="getFieldValue(section.fields['name'])"
                      v-on:input="onInput(section.fields['name'], $event)" ></form-field>
            <form-field :field="section.fields['phone']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['phone'])"
                        v-on:input="onInput(section.fields['phone'], $event)" ></form-field>
            <form-field :field="section.fields['email']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['email'])"
                        v-on:input="onInput(section.fields['email'], $event)" ></form-field>
          </v-col>
          <v-col class="col-12 col-md-4">
            <form-field :field="section.fields['jobTitle']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['jobTitle'])"
                        v-on:input="onInput(section.fields['jobTitle'], $event)" ></form-field>
            <form-field :field="section.fields['department']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['department'])"
                        v-on:input="onInput(section.fields['department'], $event)" ></form-field>
            <form-field :field="section.fields['website']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['website'])"
                        v-on:input="onInput(section.fields['website'], $event)" ></form-field>
          </v-col>
          <v-col class="col-12 col-md-4">
            <v-select :items="Countries" item-text="name" item-value="id" label="Country"
                      v-model="model.country" v-on:change="countryChange()" :rules="[v => !!v || 'Field is required']" class="mb-2"></v-select>
            <v-select :items="Cities" item-text="name" item-value="id" label="City"
                      v-model="model.city" :rules="[v => !!v || 'Field is required']" class="mb-2"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <form-field :field="section.fields['technical_decision_maker_name']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['technical_decision_maker_name'])"
                        v-on:input="onInput(section.fields['technical_decision_maker_name'], $event)" ></form-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <form-field :field="section.fields['technical_decision_maker_email']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['technical_decision_maker_email'])"
                        v-on:input="onInput(section.fields['technical_decision_maker_email'], $event)" ></form-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <form-field :field="section.fields['business_decision_maker_name']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['business_decision_maker_name'])"
                        v-on:input="onInput(section.fields['business_decision_maker_name'], $event)" ></form-field>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <form-field :field="section.fields['business_decision_maker_email']" :form_name="formConfig.form_name"
                        v-bind:value="getFieldValue(section.fields['business_decision_maker_email'])"
                        v-on:input="onInput(section.fields['business_decision_maker_email'], $event)" ></form-field>
          </v-col>
      </v-row>

    </template>
  </parent-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import FormMixin from "@/mixins/FormMixin"
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import FormField from "@/components/FormField";
import eventBus from "@/eventBus";
export default {
  mixins: [FormMixin],
  components:{
    ParentForm,
    FormField,
  },
  data() {
    return {
      dialog: false,
      formConfig: {
        contact_form_fields : {
            "title": "New Customer",
            "description": null,
            "form": [
              {
                "name": "contact_details",
                "label": "Contact Details",
                "fields": {
                  "name": {
                    "value": "",
                    "attr": {
                      "class": ""
                    },
                    "name": "name",
                    "full_name": "form[name]",
                    "disabled": false,
                    "label": "Name",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "jobTitle": {
                    "value": "",
                    "attr": {
                      "class": ""
                    },
                    "name": "jobTitle",
                    "full_name": "form[jobTitle]",
                    "disabled": false,
                    "label": "Job Title",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "email": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "email",
                    "full_name": "form[email]",
                    "disabled": false,
                    "label": "Email",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "phone": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "phone",
                    "full_name": "form[phone]",
                    "disabled": false,
                    "label": "Phone",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\NumberType"
                  },
                  "website": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "website",
                    "full_name": "form[website]",
                    "disabled": false,
                    "label": "Website",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "department": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "department",
                    "full_name": "form[department]",
                    "disabled": false,
                    "label": "Department",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "technical_decision_maker_name": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "technical_decision_maker_name",
                    "full_name": "form[technical_decision_maker_name]",
                    "disabled": false,
                    "label": "Technical decision maker name",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "technical_decision_maker_email": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "technical_decision_maker_email",
                    "full_name": "form[technical_decision_maker_email]",
                    "disabled": false,
                    "label": "Technical decision maker email",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "business_decision_maker_name": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "business_decision_maker_name",
                    "full_name": "form[business_decision_maker_name]",
                    "disabled": false,
                    "label": "Business decision maker name",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                  "business_decision_maker_email": {
                    "value": "",
                    "attr": {
                      "maxlength": 255,
                      "class": ""
                    },
                    "name": "business_decision_maker_email",
                    "full_name": "form[business_decision_maker_email]",
                    "disabled": false,
                    "label": "Business decision maker email",
                    "valid": true,
                    "data": null,
                    "required": true,
                    "size": null,
                    "submitted": false,
                    "sonata_help": null,
                    "row_class": "col-md-12",
                    "type": "Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType"
                  },
                }
              },
            ]
        },
        form_name : 'customer_view',
        main_action_onsubmit: this.save,
        isDialog : true,
        form_add: this.axios.defaults.endpoints.contact.add,
        disabled: false,
      },
      model: {
        name:null,
        jobTitle:null,
        email:null,
        phone:null,
        website:null,
        department:null,
        country:null,
        city:null,
        business_decision_maker_name:null,
        business_decision_maker_email:null,
        technical_decision_maker_name:null,
        technical_decision_maker_email:null,
      },
      response:[],
      form:[],
      Countries:[],
      Cities:[],
      country:null,
      city:null,
    }
  },
  created() {
      const t = this
      this.axios.get('private/country/list', {})
        .then(function (response) {
          t.$Progress.finish()
          t.Countries = response.data.data
        })
        .catch(err => {
          console.log(err);
        });
  },
  methods : {
    countryChange () {
      const t = this
      this.axios.get('private/country/show?id='+this.model.country, {})
        .then(function (response) {
          t.$Progress.finish()
          t.Cities = response.data.data.cities
        })
        .catch(err => {
          console.log(err);
        });
      this.saved = false
    },
    getFieldValue(field) {
      if (!(field.name in this.model))
        this.model[field.name] = null
      return this.model[field.name]
    },
    onInput(field, $event) {
      this.model[field.name] = $event
      this.$emit('input', this.model)
    },
  save () {

    var endpoint = "private/contact/add"
    const t = this

    const formData = new FormData();
    const fieldMappings = {
      name: 'name',
      jobTitle: 'jobTitle',
      email: 'email',
      phone: 'phone',
      website: 'website',
      department: 'department',
      country: 'country',
      city: 'city',
      business_decision_maker_name: 'business_decision_maker_name',
      business_decision_maker_email: 'business_decision_maker_email',
      technical_decision_maker_name: 'technical_decision_maker_name',
      technical_decision_maker_email: 'technical_decision_maker_email',
    };

    Object.entries(fieldMappings).forEach(([modelProp, formDataProp]) => {
      formData.append(`form[${formDataProp}]`, this.model[modelProp]);
    });
    eventBus.$emit('contact-submitted', t.model);
    this.$Progress.start()
    this.axios.post(endpoint, formData)
      .then(function (response) {
        t.$Progress.finish()
        eventBus.$emit('contact-submitted', t.model);
        t.close()
      })
      .catch(err => {
        alert("Please review your inputs and try again !")
        console.log(err);
      });
  },
  close () {
    this.dialog = false
  },
  },
}
</script>
