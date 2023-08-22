<template>
  <div class="container">
    <v-row class="mt-4">
      <icon-base icon-name="how-to-guides"><icon-sales /></icon-base><p style="margin-left: 10px" >Sales & Marketing</p>
    </v-row>
    <div class="sections" style="margin-top: 20px">
      <div class="box pa-8">
        <v-row>
          <v-col>
            <p>Section 1</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4 class="section-text">Brand Assets & Marketing Material</h4>
          </v-col>
        </v-row>
        <div class="scrollable-table">

          <v-row style="flex: 0 1 auto;width: 90%;margin-top: 10px;margin-left: 1px;" class="section-text" >

              <div>Darkivore</div><hr class="dotted-line" style="flex: 1 1 auto"><a @click="downloadFile()" ><icon-base icon-name="download"><icon-download /></icon-base> </a>

          </v-row>


        </div>
      </div>
      <div class="box pa-8">
        <v-row>
          <v-col>
            <p class="section-text">Section 2</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4 class="section-text">Pricelists & Discounts</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="scrollable-table">
            <v-data-table
              :headers="headers"
              :items="events"
              class="table"
            >
              <template v-slot:item.product="{ item }">
                {{ item.product }}
              </template>
              <template v-slot:item.price="{ item }">
                {{ item.price }}
              </template>
              <template v-slot:item.discount="{ item }">
                {{ item.discount }}
              </template>
              <template v-slot:item.actions="{ item }">
              <a @click="downloadFile()"><icon-base icon-name="download"><icon-download /></icon-base></a>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="sections" style="margin-top: 20px">
      <div class="box pa-8">
        <v-row>
          <v-col>
            <p class="section-text">Section 3</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4 class="section-text">Ordering, Invoicing & Delivery</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" dark class="ml-2" small elevation="0" @click="viewProduct">Product Order (PO)</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="box pa-8">
        <v-row>
          <v-col>
            <p class="section-text">Section 4</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4 class="section-text">Forecasting & Quarterly Business Review (QBR)</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" dark class="ml-2" small elevation="0" @click="viewForecast">Forecast</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" dark class="ml-2" small elevation="0" @click="viewQBR">QBR</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="box pa-8">
        <v-row>
          <v-col>
            <p>Section 5</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4 class="section-text">Marketing Development Fund (MDF)</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" dark class="ml-2" small elevation="0" @click="viewActivity">Activity</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import IconDownload from "@/components/icons/IconDownload.vue"
import IconSales from "@/components/icons/IconSales.vue"
import IconBase from "@/components/IconBase.vue"

export default {
  name: 'Sales_Marketing',

  components: {
    IconBase,
    IconDownload,
    IconSales,
  },
  data: () => ({
    headers: [
      { text: 'Product/Service', value: 'product', sortable: false, align: 'center' },
      { text: 'Price', value: 'price', sortable: false, align: 'center' },
      { text: 'Discount', value: 'discount', sortable: false, align: 'center' },
      { text: '', value: 'actions', sortable: false, align: 'center' },
    ],
    events: [
      {
        "product": "Darkivore",
        "price": "1500",
        "discount":"15%",
        "actions":"file",
      },
      {
        "product": "Test",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
      {
        "product": "Tace",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
      {
        "product": "TEst",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },  {
        "product": "Darkivore",
        "price": "1500",
        "discount":"15%",
        "actions":"file",
      },
      {
        "product": "Test",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
      {
        "product": "Tace",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
      {
        "product": "TEst",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },  {
        "product": "Darkivore",
        "price": "1500",
        "discount":"15%",
        "actions":"file",
      },
      {
        "product": "Test",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
      {
        "product": "Tace",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
      {
        "product": "TEst",
        "price": "1200",
        "discount":"20%",
        "actions":"file",
      },
    ],
    count : 0,
    page: 1,
    itemsPerPage: 16,
    sortBy: '',
    sortDesc: 'ASC',
    dialogEventDelete: false,
    editedEventIndex: -1,
    editedEventItem: {
      id: 0
    },
    defaultEventItem: {
      id: 0
    },
  }),
  computed: {
    ...mapGetters({
      Countries: "StateCountries",
      MdfStatuses: "StateMdfStatuses"
    })
  },
  created() {
    const t = this
    this.$Progress.start()
    this.axios.get('private/country/list', {})
      .then(function (response) {
        t.$Progress.finish()
        t.StateSetCountries(response.data.data)

        t.axios.get('private/mdfstatus/list', {})
          .then(function (response) {
            t.$Progress.finish()
            t.StateSetMdfStatuses(response.data.data)

            t.getEvents()
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(["StateSetCountries", "StateSetMdfStatuses"]),

    viewProduct() {
      this.$router.push({ name: 'product_orders_list'})
    },
    viewForecast() {
      this.$router.push({ name: 'forecasting_list'})
    },
    viewQBR() {
      this.$router.push({ name: 'QBR_list'})
    },
    viewActivity() {
      this.$router.push({ name: 'mdf'})
    },
    downloadFile (doc) {
      this.axios.get(doc.file, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = "download"
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    },
    getCountry(country_id) {
      return this.Countries.find(country => country.id === country_id)
    },
    getMdfStatus(status_id) {
      return this.MdfStatuses.find(status => status.id === status_id)
    },
    addEvent() {
      this.$router.push({ name: 'mdf_add', params: { event: {} }})
    },
    tablePageUpdated(page) {
      this.page = page
      this.getEvents()
    },
    tableItemsPerPageUpdated(itemsPerPage) {
      this.itemsPerPage = itemsPerPage
      this.getEvents()
    },
    tableSortByUpdated(sortBy) {
      if (sortBy) {
        this.sortBy = sortBy
        if (this.sortBy == 'latestUpdate.date')
          this.sortBy = 'latest_update'
      }
      else
        this.sortBy = ''
      this.getEvents()
    },
    tableSortDescUpdated(sortDesc) {
      if (sortDesc)
        this.sortDesc = "DESC"
      else
        this.sortDesc= "ASC"
      this.getEvents()
    },
    getEvents() {
      // const t = this
      // this.$Progress.start()
      //
      // this.axios.get('private/mdf/list?filter[_page]='+this.page+'&filter[_per_page]='+this.itemsPerPage+'&filter[_sort_by]='+this.sortBy+'&filter[_sort_order]='+this.sortDesc, {})
      //   .then(function (response) {
      //     t.$Progress.finish()
      //     t.count = response.data.count
      //     t.events = response.data.data
      //     console.log(t.events)
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    deleteEvent (item) {
      this.editedEventIndex = this.events.indexOf(item)
      this.editedEventItem = Object.assign({}, item)
      this.dialogEventDelete = true
    },
    deleteEventItemConfirm() {
      const t = this
      this.$Progress.start()
      this.axios.post('private/mdf/delete?id='+this.editedEventItem.id, {})
        .then(function (response) {
          t.$Progress.finish()
          t.events.splice(t.editedEventIndex, 1)
          t.closeEventDelete()
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeEventDelete () {
      this.dialogEventDelete = false
      this.$nextTick(() => {
        this.editedEventItem = Object.assign({}, this.defaultEventItem)
        this.editedEventIndex = -1
      })
    }
  }
}
</script>

<style lang="scss">
.table a {
  text-decoration: none;
}

.v-image {
  margin: auto;
}
.sections {
  display: flex;
}
.box{
  margin-inline: 20px
}
.scrollable-table{
  height: 400px;
  overflow: auto;
}
.dotted-line {
  display: inline-block;
  border-top: 2px dotted #999;
  margin: 20px;
}

.scrollable-table::-webkit-scrollbar {
  width: 6px;
}

.scrollable-table::-webkit-scrollbar-track {
  background: #d0d0d0;
  border: none;
  border-radius: 0;
  margin: 8px 0;
  box-shadow:   0 0 0 1px #d0d0d0;
}
.scrollable-table::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-left: 10px solid white;
  border-right: 10px solid white;
}

.scrollable-table::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 6px;
}
.section-text{
  color: #205023;
}
</style>
