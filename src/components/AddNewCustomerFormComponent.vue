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
      <v-card-title>
        <span class="text-h5">New Customer</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="model.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="model.title" label="Job Title" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="model.email" label="Email" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="model.phone" label="Phone" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="model.website" label="Website" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="model.department" label="Department" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select :items="Countries" item-text="name" item-value="id" label="Country" v-model="model.country" v-on:change="countryChange()" :rules="[v => !!v || 'Field is required']" class="mb-2"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select :items="Cities" item-text="name" item-value="id" label="City" v-model="model.city" :rules="[v => !!v || 'Field is required']" class="mb-2"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="model.businessName" label="Business decision maker name" ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="model.businessEmail" label="Business decision maker email" ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="model.technicalName" label="Technical decision maker name" ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <v-text-field v-model="model.technicalEmail" label="Technical decision maker email" ></v-text-field>
            </v-col>
          </v-row>
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
export default {
  data() {
    return {
      dialog: false,
      model: {
        name:null,
        title:null,
        email:null,
        phone:null,
        website:null,
        department:null,
        country:null,
        city:null,
        businessName:null,
        businessEmail:null,
        technicalName:null,
        technicalEmail:null,
      },
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
  save () {

    var endpoint = "private/contact/add"
    const t = this

    const formData = new FormData();
    formData.append("form[name]", this.model.name);
    formData.append("form[jobTitle]", this.model.title);
    formData.append("form[email]", this.model.email);
    formData.append("form[phone]", this.model.phone);
    formData.append("form[website]", this.model.website);
    formData.append("form[department]", this.model.department);
    formData.append("form[country]", this.model.country);
    formData.append("form[city]", this.model.city);
    formData.append("form[business_decision_maker_name]", this.model.businessName);
    formData.append("form[business_decision_maker_email]", this.model.businessEmail);
    formData.append("form[technical_decision_maker_name]", this.model.technicalName);
    formData.append("form[technical_decision_maker_email]", this.model.technicalEmail);

    this.$Progress.start()
    this.axios.post(endpoint, formData)
      .then(function (response) {
        t.$Progress.finish()
        t.close()
      })
      .catch(err => {
        console.log(err);
      });
  },
  close () {
    this.dialog = false
  },
  },
}
</script>
