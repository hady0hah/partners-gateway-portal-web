<template>
  <div class="container">
    <div class="">
      <v-row class="mt-6 mb-6">
          <v-btn class="mr-4" color="primary" @click="save(false)" small elevation="0" v-if="event.id == 0 || event.isEditable">Save</v-btn>
          <v-btn class="mr-4" color="primary" @click="save(true)" small elevation="0" v-if="event.id && event.isEditable" :disabled="!saved">Submit</v-btn>
          <v-btn class="mr-4" @click="back" small elevation="0">Back</v-btn>
        </v-row>
      <v-form
        ref="form"
        lazy-validation
        :disabled="!this.disabled"
      >
        <v-row class="box">
          <v-col class="col-12">
          	<v-row>
        			<h4>Event Related</h4>
      			</v-row>
          	<v-row>
          		<v-col class="col-12 col-md-6">
								<v-text-field v-model="event.name" label="Event Name" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
							</v-col>
							<v-col class="col-12 col-md-6">
								<v-text-field v-model="event.targetAudience" label="Target Audience" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
          		<v-col class="col-12 col-md-6">
          			Event Location
								<v-select
									:items="Countries"
									item-text="label"
									item-value="id"
									label="Select Country"
									v-model="event['country.id']"
									v-on:change="countryChange()"
									:rules="[v => !!v || 'Field is required']"
									class="mb-2"
								></v-select>
								<v-select
									:items="cities"
									item-text="label"
									item-value="id"
									label="City"
									v-model="event['city.id']"
									v-on:change="valueChange()"
									:rules="[v => !!v || 'Field is required']"
									class="mb-2"
								></v-select>
							</v-col>
							<v-col class="col-12 col-md-6">
								<v-text-field v-model="event.visitorsNumber" label="Expected Visitors (per day)" type="number" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
							</v-col>
						</v-row>
            <v-row>
          		<v-col class="col-12 col-md-6">
          			Event Date
								<v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startDateText"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[v => !!v || 'Field is required']"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="event.startDate.date"
                    v-on:change="valueChange()"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
								to
								<v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endDateText"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[v => !!v || 'Field is required']"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="event.endDate.date"
                    v-on:change="valueChange()"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
							</v-col>
							<v-col class="col-12 col-md-6">
								<v-text-field v-model="event.LeadsNumber" label="Expected number of leads generated from this event" type="number" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
          		<v-col class="col-12 col-md-6">
								<v-text-field v-model="event.participationFee" label="Participation fee" type="number" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
          		<v-col class="col-12">
          			Type of Participation
								<v-select
									:items="participationTypes"
									item-text="name"
									item-value="id"
									label="Sponsor"
									v-model="event['participation.id']"
									v-on:change="participationTypeChange()"
									:rules="[v => !!v || 'Field is required']"
									class="mb-2"
								></v-select>
								<v-select
									:items="sponsorshipTypes"
									item-text="name"
									item-value="id"
									label="Type of Sponsorship"
									v-model="event['sponshorshipType.id']"
									v-on:change="valueChange()"
									:rules="[v => !!v || 'Field is required']"
									class="mb-2"
								></v-select>
							</v-col>
						</v-row>
						<v-row>
          		<v-col class="col-12">
          			Type of exhibition space
								<v-select
									:items="spaces"
									item-text="name"
									item-value="id"
									label="Booth"
									v-model="event['space.id']"
									v-on:change="valueChange()"
									:rules="[v => !!v || 'Field is required']"
									class="mb-2"
								></v-select>
								<v-text-field v-model="event.Dimensions" label="Dimensions" type="number" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
								<v-text-field v-model="event.contributionCost" label="Contribution Cost" type="number" :rules="[v => !!v || 'Field is required']" v-on:change="valueChange()"></v-text-field>
							</v-col>
						</v-row>
          </v-col>
        </v-row>
        <v-row class="box mt-15">
          <v-col class="col-12">
          	<v-row>
        			<h4>Event Representative</h4>
      			</v-row>
          	<v-row>
          		<p>What product will you be representing?
							<v-select
								:items="products"
								item-text="name"
								item-value="id"
								label="Select Product"
								v-model="event['product.id']"
								v-on:change="valueChange()"
								:rules="[v => !!v || 'Field is required']"
								class="mb-2"
							></v-select></p>
						</v-row>
						<v-row>
          		<p>Need any training on the related product?
							<v-radio-group v-model="event.training" v-on:change="valueChange()" row>
								<v-radio
									label="Yes"
									:value="true">
								</v-radio>
								<v-radio
									label="No"
									:value="false">
								</v-radio>
							</v-radio-group></p>
						</v-row>
						<v-row>
          		<p>Need a representative on behalf of the company at the event?
							<v-radio-group v-model="event.representative" v-on:change="valueChange()" row>
								<v-radio
									label="Yes"
									:value="true"
								></v-radio>
								<v-radio
									label="No"
									:value="false"
								></v-radio>
							</v-radio-group></p>
						</v-row>
          </v-col>
        </v-row>
        <v-row class="box mt-15">
          <v-col class="col-12">
          	<v-row>
        			<h4>Materials Needed</h4>
      			</v-row>
          	<v-row>
          		<v-col class="col-12 col-md-6" v-for="material in materials" :key="material.name">
								<v-text-field v-model="event.materials[material.label]" :label="material.label" v-on:change="valueChange()"></v-text-field>
							</v-col>
						</v-row>
						<v-row>
          		<v-col class="col-12">
								Materials Submission Date
								<v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="materialSubmissionText"
                      label="Submission Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="event.materialSubmission.date"
                    v-on:change="valueChange()"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
							</v-col>
						</v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { mapActions } from "vuex";

  export default {
    props: ['id'],
    data: () => ({
      event: {
      	id: '',
      	startDate: {
          date: ''
        },
        endDate: {
          date: ''
        },
        materials: {},
        materialSubmission: {
        	date: ''
        },
        training: '',
        representative: ''
      },
      products: [],
      product: {},
      cities: [],
      spaces: [],
      participationTypes: [],
      sponsorshipTypes: [],
      materials: {},
      saved: true,
      disabled:null,
    }),
    computed: {
      ...mapGetters({
        MdfStatuses: "StateMdfStatuses",
        Countries: "StateCountries"
      }),
      startDateText() {
        return this.getDate(this.event.startDate.date)
      },
      endDateText() {
        return this.getDate(this.event.endDate.date)
      },
      materialSubmissionText() {
      	return this.getDate(this.event.materialSubmission.date)
      }
    },
    mounted () {
      this.disabled = this.$route.params.disabled
    },
    created () {
      const t = this
      if (this.id) {
      	this.event.id = this.id
				this.$Progress.start()
				this.axios.get('private/mdf/show?id='+this.event.id, {})
				.then(function (response) {
					t.event = response.data.data
					if (t.event.materials == null)
        		t.event.materials = {}
        	if (t.event.materialSubmission == null) {
        		t.event.materialSubmission = {
        			date: ''
        		}
        	}
        	console.log(t.event)
					t.countryChange()
					t.participationTypeChange()
					t.saved = true
				})
				.catch(err => {
					console.log(err);
				});
			}

      if (!this.Countries) {
      	this.axios.get('private/country/list', {})
				.then(function (response) {
					t.$Progress.finish()
					t.StateSetCountries(response.data.data)
				})
				.catch(err => {
					console.log(err);
				});
			}

			if (!this.mdfStatuses) {
				this.axios.get('private/mdfstatus/list', {})
        .then(function (response) {
          t.$Progress.finish()
          t.StateSetMdfStatuses(response.data.data)
        })
        .catch(err => {
          console.log(err);
        });
			}

			this.$Progress.increase(10)
			this.axios.get('private/participationType/list', {})
			.then(function (response) {
				t.$Progress.finish()
				t.participationTypes = response.data.data
			})
			.catch(err => {
				console.log(err);
			});

			this.$Progress.increase(10)
			this.axios.get('private/exSpace/list', {})
			.then(function (response) {
				t.$Progress.finish()
				t.spaces = response.data.data
			})
			.catch(err => {
				console.log(err);
			});

      this.$Progress.increase(10)
      this.axios.get('private/product/list', {})
      .then(function (response) {
        t.$Progress.finish()
        t.products = response.data.data
      })
      .catch(err => {
        console.log(err);
      });

      this.$Progress.increase(10)
      this.axios.get('private/material/list', {})
      .then(function (response) {
        t.$Progress.finish()
        t.materials = response.data.data
        for (const material in t.materials) {
					if (!t.event.materials.hasOwnProperty(material.name))
						t.event.materials[material.name] = ""
				}
      })
      .catch(err => {
        console.log(err);
      });
    },
    methods: {
    	...mapActions(["StateSetCountries", "StateSetMdfStatuses"]),

      countryChange () {
      	const t = this
        this.axios.get('private/country/show?id='+this.event['country.id'], {})
        .then(function (response) {
          t.$Progress.finish()
          t.cities = response.data.data.cities
        })
        .catch(err => {
          console.log(err);
        });
        this.saved = false
      },
      participationTypeChange () {
      	const t = this
        this.axios.get('private/participationType/show?id='+this.event['participation.id'], {})
        .then(function (response) {
          t.$Progress.finish()
          t.sponsorshipTypes = response.data.data.sponsorshipTypes
        })
        .catch(err => {
          console.log(err);
        });
        this.saved = false
      },
      productChange () {
      	this.saved = false
      },
      valueChange() {
      	this.saved = false
      },
      save (submit) {
        if (!this.$refs.form.validate())
          return;

        const t = this
        this.$Progress.start()
        var endpoint = ""
        if (!this.event.id)
          endpoint = 'private/mdf/save'
        else if (!submit)
          endpoint = 'private/mdf/edit?id='+this.event.id
        else
        	endpoint = 'private/mdf/submit?id='+this.event.id

        const formData = new FormData();
        formData.append("form[name]", this.event.name)
        formData.append("form[targetAudience]", this.event.targetAudience)
        formData.append("form[country]", this.event['country.id'])
        formData.append("form[city]", this.event['city.id'])
        formData.append("form[startDate]", this.event.startDate.date.includes("00:00:00.000000") ? this.event.startDate.date : this.event.startDate.date + 'T00:00:00')
        formData.append("form[endDate]", this.event.endDate.date.includes("00:00:00.000000") ? this.event.endDate.date : this.event.endDate.date + 'T00:00:00')
        formData.append("form[participationFee]", this.event.participationFee)
        formData.append("form[participation]", this.event['participation.id'])
        formData.append("form[sponshorshipType]", this.event['sponshorshipType.id'])
        formData.append("form[visitorsNumber]", this.event.visitorsNumber)
        formData.append("form[LeadsNumber]", this.event.LeadsNumber)
        formData.append("form[space]", this.event['space.id'])
        formData.append("form[contributionCost]", this.event.contributionCost)
        formData.append("form[Dimensions]", this.event.Dimensions)
        formData.append("form[product]", this.event['product.id'])
        formData.append("form[training]", this.event.training == true ? '1' : '0')
        formData.append("form[representative]", this.event.representative == true ? '1' : '0')
        if (this.event.materialSubmission.date != "")
        	formData.append("form[materialSubmission]", this.event.materialSubmission.date.includes("00:00:00.000000") ? this.event.materialSubmission.date : this.event.materialSubmission.date + 'T00:00:00')
        else
        	formData.append("form[materialSubmission]", "")
        formData.append("form[materials]",  JSON.stringify(this.event.materials))

        this.axios.post(endpoint, formData)
        .then(function (response) {
          t.$Progress.finish()

          if (response.data.success == true) {
          	console.log(response)
          	t.event.id = response.data.data.id
          	t.event.isEditable = response.data.data.isEditable
          	t.saved = true
          	alert(response.data.message)
          }
          else if (response.data.status == 701) {
          	if (response.data.message)
          		alert(response.data.message)
          	else
            	alert(response.data.errors.global[0])
            return
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      back() {
        this.$router.push("/mdf");
      }
    }
  }
</script>
