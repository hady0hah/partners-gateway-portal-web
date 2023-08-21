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
              :server-items-length="count"
              :footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
              @update:page="tablePageUpdated"
              @update:items-per-page="tableItemsPerPageUpdated"
              @update:sort-by="tableSortByUpdated"
              @update:sort-desc="tableSortDescUpdated"
              class="table"
            >
              <template v-slot:item.id="{ item }">
                <router-link :to="'/mdf/'+item.id" >{{ item.id }}</router-link>
              </template>
              <template v-slot:item.startDate.date="{ item }">
                {{ friendlyDate(item.startDate.date) }}
              </template>
              <template v-slot:item.country="{ item }">
                {{ getCountry(item['country.id']).label }}
              </template>
              <template v-slot:item.status="{ item }">
                <v-img :src="getMdfStatus(item['status.id']).imageFile" width="30"></v-img>
              </template>
              <template v-slot:item.actions="{ item }">
                <router-link :to="'/mdf/'+item.id" v-if="item.isEditable">
                  <v-icon
                    small
                    class="mr-2"
                  >
                    mdi-pencil
                  </v-icon>
                </router-link>
                <v-icon
                  small
                  class="mr-2"
                  @click="deleteEvent(item)"
                  v-if="item.isEditable"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:item.contributionCost="{ item }">
                {{ (item.contributionCost ? item.contributionCost : '0') | currency }}
              </template>
              <template v-slot:top>
                <v-dialog v-model="dialogEventDelete" max-width="500px">
                  <v-card>
                    <v-card-title>Are you sure you want to delete this event?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="closeEventDelete">Cancel</v-btn>
                      <v-btn color="primary" text @click="deleteEventItemConfirm">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </v-toolbar>
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
      { text: 'Event Date', value: 'startDate.date', sortable: false, align: 'center' },
      { text: 'Country', value: 'country', sortable: false, align: 'center' },
      { text: 'Cost', value: 'contributionCost', sortable: false, align: 'center' },
    ],
    events: [],
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
      this.$router.push({ name: 'productOrders'})
    },
    viewForecast() {
      this.$router.push({ name: 'forecasting'})
    },
    viewQBR() {
      this.$router.push({ name: 'QBR'})
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
      const t = this
      this.$Progress.start()

      this.axios.get('private/mdf/list?filter[_page]='+this.page+'&filter[_per_page]='+this.itemsPerPage+'&filter[_sort_by]='+this.sortBy+'&filter[_sort_order]='+this.sortDesc, {})
        .then(function (response) {
          t.$Progress.finish()
          t.count = response.data.count
          t.events = response.data.data
          console.log(t.events)
        })
        .catch(err => {
          console.log(err);
        });
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
