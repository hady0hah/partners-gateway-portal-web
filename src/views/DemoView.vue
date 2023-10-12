<template>
  <div class="container">
    <div class="box">
      <v-row>
        <h4 v-if="!id">Book a Demo</h4>
        <h4 v-if="id">Edit Demo Details</h4>
      </v-row>
      <v-row class="mt-6 mb-6">
          <v-btn v-if="!id || (id && timeslot && momentDate(todayDate()) <= momentDate(friendlyDate(timeslot.day.date)))" class="mr-4" color="primary" @click="save" small elevation="0">Save</v-btn>
          <v-btn v-if="id && timeslot && momentDate(todayDate()) <= momentDate(friendlyDate(timeslot.day.date))" class="mr-4" color="red" @click="cancelDemo" small elevation="0">Cancel</v-btn>
          <v-btn class="mr-4" @click="back" small elevation="0">Back</v-btn>
        </v-row>
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col class="col-12 col-md-6">
            <v-select
              :items="deals"
              item-text="name"
              item-value="id"
              label="Deal Ref"
              v-model="demo['deal.id']"
              v-on:change="dealChange()"
              :rules="isDealRequired()"
              class="mb-2"
            ></v-select>
            <v-card elevation="2" shaped class="pa-4">
              <v-row>
                <v-col cols="6">
                  <h4>Prospect Details</h4>
                </v-col>
              </v-row>
              <v-row v-if="deal && deal.contact">
                <h5>Company Name</h5><p class="ml-2">{{ deal.contact.company }}</p>
              </v-row>
              <v-row v-if="deal && deal.contact">
                <h5>Contact in charge</h5><p class="ml-2">{{ deal.contact.name }}</p>
              </v-row>
              <v-row>
                <v-text-field v-model="demo.paxNumber" label="Number of pax attending" type="number" :rules="[v => !!v || 'Field is required']"></v-text-field>
              </v-row>
              <v-row>
                <v-text-field v-model="demo.dueExpectations" label="Due expectations" :rules="[v => !!v || 'Field is required']"></v-text-field>
              </v-row>
              <v-row>
                <v-textarea
                  v-model="demo.notes"
                  label="Notes"
                ></v-textarea>
              </v-row>
            </v-card>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-select
              :disabled="this.disabledProduct"
              :items="products"
              item-text="name"
              item-value="id"
              label="Demo Product"
              v-model="demo['product.id']"
              v-on:change="productChange()"
              :rules="isProductRequired()"
              class="mb-2"
            ></v-select>
            <v-card elevation="2" shaped class="pa-4">
              <v-row>
                <v-col cols="12">
                  <v-sheet height="64">
                    <v-toolbar
                      flat
                    >
                      <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                      >
                        Today
                      </v-btn>
                      <v-btn
                        fab
                        text
                        small
                        color="grey darken-2"
                        @click="prev"
                      >
                        <v-icon small>
                          mdi-chevron-left
                        </v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        text
                        small
                        color="grey darken-2"
                        @click="next"
                      >
                        <v-icon small>
                          mdi-chevron-right
                        </v-icon>
                      </v-btn>
                      <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                      </v-toolbar-title>
                    </v-toolbar>
                  </v-sheet>
                  <v-sheet height="580">
                    <v-calendar
                      ref="calendar"
                      v-model="focus"
                      :type="type"
                      :events="events"
                      @click:date="hideTimeslot"
                      @click:event="showTimeslot"
                    ></v-calendar>
                  </v-sheet>
                  <div class="mt-2" v-if="focus">
                    <h5>Date: {{ focus }}</h5>
                    <h5>Start Time: {{ time }}</h5>
                    <h5>End Time: {{ endTime }}</h5>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id', '_demo'],
    data: () => ({
      demo: null,
      disabledProduct: null,
      focus: '',
      type: 'month',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      deals: [],
      deal: {},
      products: [],
      product: {},
      timeslots: [],
      timeslot: null,
      contact: '',
      notes: '',
      time: null,
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    created () {
      this.demo = this._demo
      const t = this
      this.$Progress.start()
      this.axios.get('private/deals/list', {})
      .then(function (response) {
        t.deals = response.data.data.items
        t.deals.forEach((deal) => {
          t.$Progress.increase(10)
          t.axios.get('private/contact/show?id='+deal['contact.id'], {})
          .then(function (response) {
            deal.contact = response.data.data
          })
          .catch(err => {
            console.log(err);
          });
        });
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

      if (this.demo.id) {
        this.$Progress.start()
        let getTimeslotUrl = this.axios.defaults.endpoints.resolve(this.axios.defaults.endpoints.timeslot.show, { id: this.demo['timeslot.id'] })
        this.axios.get(getTimeslotUrl)
          .then(function (response) {
            t.$Progress.finish()
            t.timeslot = response.data.data
            t.timeslot.startTime = response.data.data.formattedStartTime.date
            t.timeslot.endTime = response.data.data.formattedEndTime.date
            t.updateTimeslotDisplay()
            t.getTimeslots()
            t.dealChange()
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    methods: {
      isDealRequired(){
        if (!this.demo['product.id']) {
          return [v => !!v || 'Field is required'];
        }
      },
      isProductRequired(){
        if (!this.demo['deal.id']) {
          return [v => !!v || 'Field is required'];
        }
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      getTimeslots () {
        const t = this
        this.$Progress.start()
        this.axios.get('private/timeslots/list?filter[product][value]='+this.demo['product.id']+'&filter[booked][value]=2', {})
        .then(function (response) {
          t.$Progress.finish()
          t.timeslots = response.data.data
          const events = []
          t.timeslots.forEach ((timeslot) => {
            events.push({
              id: timeslot.id,
              name: '',
              start: t.formatDate(timeslot.formattedStartTime.date),
              end: t.formatDate(timeslot.formattedEndTime.date),
              day: {
                date: t.formatDate(timeslot.day.date)
              },
              color: 'primary',
              timed: true,
              startTime: timeslot.formattedStartTime.date,
              endTime: timeslot.formattedEndTime.date,
            })
          });

          t.events = events
        })
        .catch(err => {
          console.log(err);
        });
      },
      showTimeslot ({ nativeEvent, event }) {
        this.timeslot = event
        this.updateTimeslotDisplay()
      },
      hideTimeslot () {
        this.timeslot = null
        this.updateTimeslotDisplay()
      },
      updateTimeslotDisplay() {
        if (this.timeslot != null) {
          this.focus = this.getDate(this.timeslot.day.date)
          this.time =  this.getTime(this.timeslot.startTime);
          this.endTime = this.getTime(this.timeslot.endTime);
        } else {
          this.focus = null
          this.time = null
          this.endTime = null
        }
      },
      dealChange () {
        this.deal = this.deals.find(deal => deal.id === this.demo['deal.id'])
        let product = this.products.find(product => product.id === this.deal['product.id'])
        this.demo['product.id'] = product.id
        this.productChange()
        this.disabledProduct = true
      },
      productChange () {
        this.getTimeslots()
      },
      save () {
        if (!this.$refs.form.validate())
          return;

        if (!this.timeslot) {
          alert("Please pick a timeslot")
          return
        }

        const t = this
        this.$Progress.start()
        var endpoint = ""
        if (!this.id)
          endpoint = 'private/demo/add'
        else
          endpoint = 'private/demo/edit?id='+this.id

        const formData = new FormData();
        formData.append("form[deal]", this.demo['deal.id'] ? this.demo['deal.id'] : '');
        formData.append("form[product]", this.demo['product.id'])
        formData.append("form[timeslot]", this.timeslot.id)
        formData.append("form[pax_number]", this.demo.paxNumber)
        formData.append("form[due_expectations]", this.demo.dueExpectations)

        this.axios.post(endpoint, formData)
        .then(function (response) {
          t.$Progress.finish()
          if (response.data.status == 701) {
            alert(response.data.errors.global[0])
            return
          }
          t.demo = response.data.data
          t.back()
        })
        .catch(err => {
          console.log(err);
        });
      },
      cancelDemo() {
        const t = this
        this.$Progress.start()

        this.axios.post('private/demo/cancel?id='+this.id, {})
        .then(function (response) {
          t.$Progress.finish()
          t.back()
        })
        .catch(err => {
          console.log(err);
        });
      },
      back() {
        this.$router.push("/demo");
      }
    }
  }
</script>
