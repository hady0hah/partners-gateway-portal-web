<template>
  <div class="container">
    <v-row class="mt-4">
      <icon-base icon-name="how-to-guides"><icon-sales /></icon-base><p style="margin-left: 10px" >Sales & Marketing</p>
    </v-row>
    <div class="sections" style="margin-top: 20px">
      <div class="box pa-8" style="width: 600px;">
        <v-row>
          <v-col>
            <h4 class="section-text">Brand Assets & Marketing Material</h4>
          </v-col>
        </v-row>
        <div class="scrollable-table">

          <v-row style="flex: 0 1 auto;width: 90%;margin-top: 15px;margin-left: 1px;" class="section-text" v-for="(material, index) in marketingMaterials" :key="index">

            <div >{{material.label}}:</div>
              <div style="padding-left: 5px">
                <a
                  v-if="isLink(material.description)"
                  :href="material.description"
                  target="_blank"
                >{{ material.description }}</a>
                <span v-else>{{ material.description }}</span>
              </div>
            <hr class="dotted-line" style="flex: 1 1 auto"><a @click="downloadFile(material)" ><icon-base icon-name="download"><icon-download /></icon-base> </a>
          </v-row>


        </div>
      </div>
      <div class="box pa-8">
        <v-row>
          <v-col>
            <h4 class="section-text">Pricelists & Discounts</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="scrollable-table">
            <v-data-table
              :headers="headers"
              :items="priceLists"
              class="table"
            >
              <template v-slot:item.region="{ item }">
                {{ item.region }}
              </template>
              <template v-slot:item.actions="{ item }">
              <a @click="downloadFile()"><span style="padding: 5px">Download</span><icon-base icon-name="download"><icon-download /></icon-base></a>
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
    marketingMaterials: [],
    priceLists: [],
    headers: [
      { text: 'Region', value: 'region', sortable: false, align: 'center' },
      { text: 'Action', value: 'actions', sortable: false, align: 'center' },
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
  mounted() {
    const t = this
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.marketing_material.url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.marketingMaterials = response.data.data
      })
      .catch(err => {
        console.log(err);
      });
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.price_discounts.url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.priceLists = response.data.data
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
    isLink(value) {
      const urlPattern = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return urlPattern.test(value);
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
